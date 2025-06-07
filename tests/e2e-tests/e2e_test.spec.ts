import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page.ts";
import { faker } from "@faker-js/faker";
import { LoginApi } from "../../src/api/login_api.ts";
import { CreateAccountApi } from "../../src/api/create_account_api.ts";
import { DashboardPage } from "../../src/pages/dashboard_page.ts";

// Vygenerování unikátních osobních údajů pomocí Faker
test("E2E FE test - TEG-B", async ({ page, request }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  const email = faker.internet.exampleEmail();
  const password = faker.internet.password();
  const phoneNumber = faker.string.numeric(9);
  const age = faker.number.int({ min: 18, max: 70 });
  const startBalance = faker.number.float({
    min: 0,
    max: 999999,
    multipleOf: 0.01,
  });
  const accountType = "Test";

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Vypsání vygenerovaných údajů do console pro další práci s klientem
  await test.step("Register user", async () => {
    console.log("Registered user:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Fullname:", firstName, lastName);
    console.log("Phone number:", phoneNumber);
    console.log("Age:", age);
    console.log(`"Start balance:", ${startBalance} Kč`);

    // Otevření base url aplikace TEG-B (login page), přesměrování na registrační formulář, úspěšná registrace, po přesměrování zpět na login page kontrola success message po registraci
    await loginPage
      .goto()
      .then((login) => login.clickRegistration())
      .then((register) =>
        register.successfullRegister(username, password, email)
      )
      .then((login) =>
        login.successRegistrationMessageHasText(
          "🎉 Registrace úspěšná! Vítejte v TEG#B! 🎉"
        )
      );
  });

  // Login pomocí API, odchycení vygenerovaného access tokenu a vytvoření účtu pomocí API + kontrola volání
  await test.step("Login and create account via API", async () => {
    const loginApi = new LoginApi(request);
    const accountApi = new CreateAccountApi(request);

    const loginResponse = await loginApi.loginViaApi(username, password);
    const loginResponseBody = await loginResponse.json();
    const token = loginResponseBody.access_token;
    expect(loginResponseBody.access_token).toBeDefined();
    expect(loginResponse.status()).toBe(201);

    const createAccountResponse = await accountApi.createAccountApi(
      token,
      startBalance,
      accountType
    );
    expect(createAccountResponse.status()).toBe(201);
  });

  // Přihlášení klienta přes FE + kontrola zobrazení dashboard
  await test.step("Login with registered user", async () => {
    await loginPage
      .goto()
      .then((loginUser) => loginUser.login(username, password))
      .then((dashboard) => dashboard.dashboardTitleHasText("TEG#B Dashboard"));
  });

  // Vyplnění profilu + kontrola success update message
  await test.step("Editing profile", async () => {
    await dashboardPage
      .clickEditProfile()
      .then((editProfile) => editProfile.saveChangesButtonIsVisible())
      .then((editProfile) =>
        editProfile.editProfile(firstName, lastName, email, phoneNumber, age)
      )
      .then((editProfile) => editProfile.clickSaveChangesButton())
      .then((updateMessage) =>
        updateMessage.successUpdateMessageHasText(
          "Profile updated successfully!"
        )
      );
  });

  // Kontrola vyplněných údajů v profilu
  await test.step("Profile check", async () => {
    await dashboardPage
      .firstNameHasText(firstName)
      .then((profile) => profile.lastNameHasText(lastName))
      .then((profile) => profile.emailHasText(email))
      .then((profile) => profile.phoneHasText(phoneNumber))
      .then((profile) => profile.ageHasText(age));
  });

  // Kontrola správného zobrazení účtu
  await test.step("Account check", async () => {
    await dashboardPage
      .accountNumberIsVisible()
      .then((account) => account.accountBalanceHasText(startBalance))
      .then((account) => account.accountTypeHasText(accountType));
  });

  // Odhlášení + kontrola úspěšného odhlášení
  await test.step("Log out", async () => {
    await dashboardPage
      .clickLogout()
      .then((loginPage) => loginPage.loginButtonToBeVisible());
  });
});
