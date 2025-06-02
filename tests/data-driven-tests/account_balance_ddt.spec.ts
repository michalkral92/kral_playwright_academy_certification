//! Tady jsem zatim nic neudělal, jen si zkopíroval část jinýho testu k přepracování

import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page.ts";
import { DashboardPage } from "../../src/pages/dashboard_page.ts";

test.describe("Data driven tests - account balance", () => {
  const username = faker.internet.username();
  const emailDomain = "test.cz";
  const email = `${username}@${emailDomain}`;
  const password = faker.internet.password();

  test("", async ({ page }) => {
    console.log("Registered user for data driven tests:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

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

    const loginApi = new LoginApi(request);
    const accountApi = new AccountApi(request);

    const accessToken = await loginApi.login(username, password);
    console.log("Access token:", accessToken);

    const accountData = await accountApi.createAccount(accessToken);
    console.log("Account created:", accountData);
  });
});
