import { expect, type Locator, type Page } from "@playwright/test";
import { RegistrationPage } from "./registration_page.ts";
import { DashboardPage } from "./dashboard_page.ts";

export class LoginPage {
  readonly page: Page;
  private readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly registrationButton: Locator;
  private readonly succesRegistrationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("//input[@data-testid='username-input']");
    this.passwordInput = page.locator("//input[@data-testid='password-input']");
    this.loginButton = page.locator("//button[@data-testid='submit-button']");
    this.registrationButton = page.locator(
      "//button[@data-testid='register-button']"
    );
    this.succesRegistrationMessage = page.locator(
      "//div[@data-testid='success-message']"
    );
  }

  async goto(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }

  async typeUsername(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async typePassword(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  async loginButtonToBeVisible(): Promise<this> {
    await expect(this.loginButton).toBeVisible();
    return this;
  }

  async clickLogin(): Promise<DashboardPage> {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async clickRegistration(): Promise<RegistrationPage> {
    await this.registrationButton.click();
    return new RegistrationPage(this.page);
  }

  async login(username: string, password: string): Promise<DashboardPage> {
    await this.typeUsername(username);
    await this.typePassword(password);
    await this.clickLogin();
    return new DashboardPage(this.page);
  }

  async successRegistrationMessageHasText(
    successMessage: string
  ): Promise<this> {
    await expect(this.succesRegistrationMessage).toHaveText(successMessage);
    return this;
  }
}
