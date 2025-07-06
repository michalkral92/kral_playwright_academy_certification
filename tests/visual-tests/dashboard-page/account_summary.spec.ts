import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login_page.ts";
import { DashboardPage } from "../../../src/pages/dashboard_page.ts";

test.describe("Dashboard page visual tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .goto()
      .then((login) => login.login("tester02", "certifikace"))
      .then((dashboard) => dashboard.accountSummaryIsVisible());
  });

  test("Account summary visual test", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect(dashboardPage.accountSummary).toHaveScreenshot(
      "account_summary_test.png"
    );
  });
});
