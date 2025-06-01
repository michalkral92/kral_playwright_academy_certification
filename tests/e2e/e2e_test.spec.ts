import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page.ts";
import { faker } from "@faker-js/faker";
import { LoginApi } from "../../src/api/login_api.ts";
import { AccountApi } from "../../src/api/create_account_api.ts";
import { DashboardPage } from "../../src/pages/dashboard_page.ts";

test("E2E FE test - TEG-B", async ({ page, request }) => {
  // Vygenerování osobních údajů pomocí Faker
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  const emailDomain = "test.cz";
  const email = `${username}@${emailDomain}`;
  const password = faker.internet.password();
  const phoneNumber = faker.string.numeric(9);
  const age = faker.number.int({ min: 18, max: 70 });

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await test.step("Register user", async () => {
    // Vypsání vygenerovaných údajů do console pro další práci s klientem

    console.log("Registered user:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Fullname:", firstName, lastName);
    console.log("Phone number:", phoneNumber);
    console.log("Age:", age);

    // V techto krocích klient otevře base url aplikace TEG-B (login page), přesměruje se na registrační formulář, vyplní registraci a po přesměrování zpět na login page proběhne kontrola success message po registraci
    await loginPage
      .goto()
      .then((login) => login.clickRegistration())
      .then((register) => register.typeUsername(username))
      .then((register) => register.typePassword(password))
      .then((register) => register.typeEmail(email))
      .then((register) => register.clickRegister())
      .then((succesMessage) =>
        succesMessage.successRegistrationMessageHasText(
          "🎉 Registrace úspěšná! Vítejte v TEG#B! 🎉"
        )
      );
  });

  await test.step("Login and create account via API", async () => {
    const loginApi = new LoginApi(request);
    const accountApi = new AccountApi(request);

    const accessToken = await loginApi.login(username, password);
    console.log("Access token:", accessToken);

    const accountData = await accountApi.createAccount(accessToken);
    console.log("Account created:", accountData);

    expect(accountData.accountType).toBe("Test");
    expect(accountData.balance).toBe(10000);
    expect(accountData.status).toBe("Active");
  });

  await test.step("Login with registered user", async () => {
    await loginPage
      .goto()
      .then((loginUser) => loginUser.login(username, password))
      .then((dashboard) => dashboard.dashboardTitleHasText("TEG#B Dashboard"));
  });

  await test.step("Editing profile", async () => {
    await dashboardPage
      .clickEditProfile()
      .then((editProfile) => editProfile.typeFirstName(firstName))
      .then((editProfile) => editProfile.typeLastName(lastName))
      .then((editProfile) => editProfile.typeEmail(email))
      .then((editProfile) => editProfile.typePhone(phoneNumber))
      .then((editProfile) => editProfile.typeAge(age))
      .then((editProfile) => editProfile.clickSaveChangesButton())
      .then((updateMessage) =>
        updateMessage.successUpdateMessageHasText(
          "Profile updated successfully!"
        )
      );
  });

  await test.step("Profile check", async () => {
    await dashboardPage
      .firstNameHasText(firstName)
      .then((profile) => profile.lastNameHasText(lastName))
      .then((profile) => profile.emailHasText(email))
      .then((profile) => profile.phoneHasText(phoneNumber))
      .then((profile) => profile.ageHasText(age));
  });

  await test.step("Account check", async () => {
    await dashboardPage
      .accountNumberIsVisible()
      .then((account) => account.accountBalanceHasText())
      .then((account) => account.accountTypeHasText());
  });

  await test.step("Log out", async () => {
    await dashboardPage
      .clickLogout()
      .then((loginPage) => loginPage.loginButtonToBeVisible());
  });
});
