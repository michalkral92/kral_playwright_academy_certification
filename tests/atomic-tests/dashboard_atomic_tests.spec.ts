import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page.ts";
import { DashboardPage } from "../../src/pages/dashboard_page.ts";
import { RegistrationApi } from "../../src/api/registration_api.ts";
import { faker } from "@faker-js/faker";

test.describe("Dashboard page atomic tests", () => {
  test.beforeEach(
    "Register and login unique user",
    async ({ page, request }) => {
      const registrationApi = new RegistrationApi(request);
      const loginPage = new LoginPage(page);

      const username = faker.internet.username();
      const email = faker.internet.exampleEmail();
      const password = faker.internet.password();

      const registrationResponse = await registrationApi.registrationViaApi(
        username,
        password,
        email
      );
      expect(registrationResponse.status()).toBe(201);

      await loginPage
        .goto()
        .then((login) => login.login(username, password))
        .then((dashboard) => dashboard.logoutButtonIsVisible());
    }
  );

  test("Left menu", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await test.step("Home button", async () => {
      await expect.soft(dashboardPage.homeButton).toBeVisible();
      await expect.soft(dashboardPage.homeButton).toHaveText("Domů");
    });

    await test.step("Accounts button", async () => {
      await expect.soft(dashboardPage.accountsButton).toBeVisible();
      await expect.soft(dashboardPage.accountsButton).toHaveText("Účty");
    });

    await test.step("Transactions button", async () => {
      await expect.soft(dashboardPage.transactionsButton).toBeVisible();
      await expect
        .soft(dashboardPage.transactionsButton)
        .toHaveText("Transakce");
    });

    await test.step("Support button", async () => {
      await expect.soft(dashboardPage.supportButton).toBeVisible();
      await expect.soft(dashboardPage.supportButton).toHaveText("Podpora");
    });
  });

  test("Dashboard header", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await test.step("Header logo", async () => {
      await expect.soft(dashboardPage.headerLogo).toBeVisible();
    });

    await test.step("Dashboard title", async () => {
      await expect.soft(dashboardPage.dashboardTitle).toBeVisible();
      await expect
        .soft(dashboardPage.dashboardTitle)
        .toHaveText("TEG#B Dashboard");
    });

    await test.step("Logout button", async () => {
      await expect.soft(dashboardPage.logoutButton).toBeVisible();
      await expect.soft(dashboardPage.logoutButton).toBeEnabled();
      await expect.soft(dashboardPage.logoutButton).toHaveText("Odhlásit se");
      await expect
        .soft((await dashboardPage.clickLogout()).page)
        .toHaveURL("https://tegb-frontend-88542200c6db.herokuapp.com/");
    });
  });

  test("Profile section", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await test.step("Profile detail title", async () => {
      await expect.soft(dashboardPage.profileDetailsTitle).toBeVisible();
      await expect
        .soft(dashboardPage.profileDetailsTitle)
        .toHaveText("Detaily Profilu");
    });

    await test.step("First name line", async () => {
      await expect.soft(dashboardPage.firstName).toBeVisible();
      await expect.soft(dashboardPage.firstName).toHaveText("Jméno: N/A");
    });

    await test.step("Last name line", async () => {
      await expect.soft(dashboardPage.lastName).toBeVisible();
      await expect.soft(dashboardPage.lastName).toHaveText("Příjmení: N/A");
    });

    await test.step("Email line", async () => {
      await expect.soft(dashboardPage.email).toBeVisible();
      await expect.soft(dashboardPage.email).toHaveText("Email: N/A");
    });

    await test.step("Phone line", async () => {
      await expect.soft(dashboardPage.phone).toBeVisible();
      await expect.soft(dashboardPage.phone).toHaveText("Telefon: N/A");
    });

    await test.step("Age line", async () => {
      await expect.soft(dashboardPage.age).toBeVisible();
      await expect.soft(dashboardPage.age).toHaveText("Věk: N/A");
    });

    await test.step("Edit profile button", async () => {
      await expect.soft(dashboardPage.editProfileButton).toBeVisible();
      await expect.soft(dashboardPage.editProfileButton).toBeEnabled();
      await expect
        .soft(dashboardPage.editProfileButton)
        .toHaveText("Upravit profil");
      await expect
        .soft((await dashboardPage.clickEditProfile()).cancelChangesButton)
        .toBeVisible();
    });
  });

  test("Accounts section", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await test.step("Accounts section title", async () => {
      await expect.soft(dashboardPage.accountsTitle).toBeVisible();
      await expect.soft(dashboardPage.accountsTitle).toHaveText("Účty");
    });

    await test.step("Account number", async () => {
      await expect.soft(dashboardPage.accountNumberHeader).toBeVisible();
      await expect
        .soft(dashboardPage.accountNumberHeader)
        .toContainText("Číslo účtu");
    });

    await test.step("Account balance", async () => {
      await expect.soft(dashboardPage.accountBalanceHeader).toBeVisible();
      await expect
        .soft(dashboardPage.accountBalanceHeader)
        .toContainText("Zůstatek");
    });

    await test.step("Account type", async () => {
      await expect.soft(dashboardPage.accountTypeHeader).toBeVisible();
      await expect
        .soft(dashboardPage.accountTypeHeader)
        .toContainText("Typ účtu");
    });

    await test.step("Add account button", async () => {
      await expect.soft(dashboardPage.addAccountButton).toBeVisible();
      await expect.soft(dashboardPage.addAccountButton).toBeEnabled();
      await expect
        .soft(dashboardPage.addAccountButton)
        .toHaveText("Přidat účet");
    });
  });
});
