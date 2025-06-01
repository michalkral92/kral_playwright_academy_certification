import { type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class RegistrationPage {
  private readonly page: Page;
  private readonly url =
    "https://tegb-frontend-88542200c6db.herokuapp.com/register";
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly emailInput: Locator;
  private readonly registrationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("//input[@data-testid='username-input']");
    this.passwordInput = page.locator("//input[@data-testid='password-input']");
    this.emailInput = page.locator("//input[@data-testid='email-input']");
    this.registrationButton = page.locator(
      "//button[@data-testid='submit-button']"
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

  async typeEmail(email: string): Promise<this> {
    await this.emailInput.fill(email);
    return this;
  }

  async clickRegister(): Promise<LoginPage> {
    await this.registrationButton.click();
    return new LoginPage(this.page);
  }

  async register(
    username: string,
    password: string,
    email: string
  ): Promise<LoginPage> {
    await this.typeUsername(username);
    await this.typePassword(password);
    await this.typeEmail(email);
    await this.clickRegister();
    return new LoginPage(this.page);
  }
}
