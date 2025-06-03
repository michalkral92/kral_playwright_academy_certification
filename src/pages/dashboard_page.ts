import { type Locator, type Page, expect } from "@playwright/test";
import { LoginPage } from "./login_page.ts";
import { ProfilePage } from "./profile_page.ts";

export class DashboardPage {
  private readonly page: Page;
  private readonly url =
    "https://tegb-frontend-88542200c6db.herokuapp.com/dashboard";
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly age: Locator;
  readonly editProfileButton: Locator;
  readonly logoutButton: Locator;
  readonly dashboardTitle: Locator;
  private readonly successUpdateMessage: Locator;
  readonly accountNumber: Locator;
  readonly accountBalance: Locator;
  readonly accountType: Locator;
  readonly homeButton: Locator;
  readonly accountsButton: Locator;
  readonly transactionsButton: Locator;
  readonly supportButton: Locator;
  readonly headerLogo: Locator;
  readonly profileDetailsTitle: Locator;
  readonly accountsTitle: Locator;
  readonly addAccountButton: Locator;
  readonly accountNumberHeader: Locator;
  readonly accountBalanceHeader: Locator;
  readonly accountTypeHeader: Locator;
  readonly accountSummary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator("//div[@data-testid='name']");
    this.lastName = page.locator("//div[@data-testid='surname']");
    this.email = page.locator("//div[@data-testid='email']");
    this.phone = page.locator("//div[@data-testid='phone']");
    this.age = page.locator("//div[@data-testid='age']");
    this.editProfileButton = page.locator(
      "//button[@data-testid='toggle-edit-profile-button']"
    );
    this.logoutButton = page.locator(
      "//button[normalize-space()='Odhlásit se']"
    );
    this.dashboardTitle = page.locator("//span[@class='app-title']");
    this.successUpdateMessage = page.locator("//div[@class='update-message']");
    this.accountNumber = page.locator("//td[@data-testid='account-number']");
    this.accountBalance = page.locator("//td[@data-testid='account-balance']");
    this.accountType = page.locator("//td[@data-testid='account-type']");
    this.homeButton = page.locator("li:nth-child(1)");
    this.accountsButton = page.locator("li:nth-child(2)");
    this.transactionsButton = page.locator("li:nth-child(3)");
    this.supportButton = page.locator("li:nth-child(4)");
    this.headerLogo = page.locator("//header//img[@data-testid='logo-img']");
    this.profileDetailsTitle = page.locator(
      "//h2[@data-testid='profile-details-title']"
    );
    this.accountsTitle = page.locator("//h2[@data-testid='accounts-title']");
    this.addAccountButton = page.locator("//button[@class='account-action']");
    this.accountNumberHeader = page.locator(
      "//th[@data-testid='account-number-heading']"
    );
    this.accountBalanceHeader = page.locator(
      "//th[@data-testid='account-balance-heading']"
    );
    this.accountTypeHeader = page.locator(
      "//th[@data-testid='account-type-heading']"
    );
    this.accountSummary = page.locator("//div[@data-testid='account-summary']");
  }

  async goto(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async clickEditProfile(): Promise<ProfilePage> {
    await this.editProfileButton.click();
    return new ProfilePage(this.page);
  }

  async dashboardTitleHasText(dashboardTitle: string): Promise<this> {
    await expect(this.dashboardTitle).toHaveText(dashboardTitle);
    return this;
  }

  async successUpdateMessageHasText(
    successUpdateMessage: string
  ): Promise<this> {
    await expect(this.successUpdateMessage).toHaveText(successUpdateMessage);
    return this;
  }

  async firstNameHasText(firstName: string): Promise<this> {
    await expect(this.firstName).toHaveText(`Jméno: ${firstName}`);
    return this;
  }

  async lastNameHasText(lastName: string): Promise<this> {
    await expect(this.lastName).toHaveText(`Příjmení: ${lastName}`);
    return this;
  }

  async phoneHasText(phone: string): Promise<this> {
    await expect(this.phone).toHaveText(`Telefon: ${phone}`);
    return this;
  }

  async emailHasText(email: string): Promise<this> {
    await expect(this.email).toHaveText(`Email: ${email}`);
    return this;
  }

  async ageHasText(age: number): Promise<this> {
    await expect(this.age).toHaveText(`Věk: ${age}`);
    return this;
  }

  async accountNumberIsVisible(): Promise<this> {
    await expect(this.accountNumber).toBeVisible();
    return this;
  }

  async accountBalanceHasText(accountBalance): Promise<this> {
    await expect(this.accountBalance).toHaveText(`${accountBalance} Kč`);
    return this;
  }

  async accountTypeHasText(accountType): Promise<this> {
    await expect(this.accountType).toHaveText(accountType);
    return this;
  }

  async accountSummaryIsVisible(): Promise<this> {
    await expect(this.accountSummary).toBeVisible();
    return this;
  }
}
