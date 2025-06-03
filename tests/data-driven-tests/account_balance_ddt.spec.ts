/*
V aplikaci je bug / specifické chování, kdy nejde založit účet s 9-ti cifernou sumou / 9-ti a více znakovým zůstatkem (např. - 196 000 921 Kč)

To znamená, že při 4. a 5. běhu skončí API volání pro založení nového účtu statusem 500. Jelikož nemáme k dispozici analýzu, kde by byly definované veškeré podmínky zakládání účtu, tak nelze určit, zda je toto bug nebo chtěné chování.
*/

import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page.ts";
import accountBalanceData from "../../src/ddt-tests-data/account_balance_data.json";
import { LoginApi } from "../../src/api/login_api.ts";
import { CreateAccountApi } from "../../src/api/create_account_api.ts";

test.describe("Data driven tests - create accounts with different account balances", () => {
  accountBalanceData.forEach((account) => {
    const { startBalance, type } = account;

    test(`Account balance: ${startBalance} Kč`, async ({ page, request }) => {
      const username = faker.internet.username();
      const emailDomain = "test.cz";
      const email = `${username}@${emailDomain}`;
      const password = faker.internet.password();

      const loginPage = new LoginPage(page);
      const loginApi = new LoginApi(request);

      await test.step("Unique user registration", async () => {
        await loginPage
          .goto()
          .then((login) => login.clickRegistration())
          .then((register) => register.typeUsername(username))
          .then((register) => register.typePassword(password))
          .then((register) => register.typeEmail(email))
          .then((register) => register.clickRegister())
          .then((login) =>
            login.successRegistrationMessageHasText(
              "🎉 Registrace úspěšná! Vítejte v TEG#B! 🎉"
            )
          );

        console.log("Registered user:");
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
      });

      await test.step("Creating account via API", async () => {
        const loginResponse = await loginApi.loginViaApi(username, password);
        const loginResponseBody = await loginResponse.json();
        const token = loginResponseBody.access_token;
        expect(loginResponse.status()).toBe(201);
        expect(loginResponseBody.access_token).toBeDefined();
        const accountApi = new CreateAccountApi(request);

        const createAccountResponse = await accountApi.createAccountApi(
          token,
          startBalance,
          type
        );
        expect(createAccountResponse.status()).toBe(201);
      });

      await test.step("Confirm account balance on FE", async () => {
        const expectedStartBalance = `${startBalance.toFixed(2)}`;

        await loginPage
          .goto()
          .then((loginUser) => loginUser.login(username, password))
          .then((dashboard) =>
            dashboard.accountBalanceHasText(expectedStartBalance)
          );
      });
    });
  });
});
