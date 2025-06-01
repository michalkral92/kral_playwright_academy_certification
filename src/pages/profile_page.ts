import { type Locator, type Page } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";

export class ProfilePage {
  private readonly page: Page;
  private readonly url =
    "https://tegb-frontend-88542200c6db.herokuapp.com/dashboard";
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly phoneInput: Locator;
  private readonly ageInput: Locator;
  private readonly saveChangesButton: Locator;
  readonly cancelChangesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator(
      "//input[@data-testid='chage-name-input']"
    );
    this.lastNameInput = page.locator(
      "//input[@data-testid='chage-surname-input']"
    );
    this.emailInput = page.locator("//input[@data-testid='chage-email-input']");
    this.phoneInput = page.locator("//input[@data-testid='chage-phone-input']");
    this.ageInput = page.locator("//input[@data-testid='chage-age-input']");
    this.saveChangesButton = page.locator(
      "//button[@data-testid='save-changes-button']"
    );
    this.cancelChangesButton = page.locator(
      "//button[@data-testid='toggle-edit-profile-button']"
    );
  }

  async typeFirstName(firstName: string): Promise<this> {
    await this.firstNameInput.fill(firstName);
    return this;
  }

  async typeLastName(lastName: string): Promise<this> {
    await this.lastNameInput.fill(lastName);
    return this;
  }

  async typeEmail(email: string): Promise<this> {
    await this.emailInput.fill(email);
    return this;
  }

  async typePhone(phone: string): Promise<this> {
    await this.phoneInput.fill(phone);
    return this;
  }

  async typeAge(age: number): Promise<this> {
    await this.ageInput.fill(age.toString());
    return this;
  }

  async clickSaveChangesButton(): Promise<DashboardPage> {
    await this.saveChangesButton.click();
    return new DashboardPage(this.page);
  }

  async clickCancelChangesButton(): Promise<DashboardPage> {
    await this.saveChangesButton.click();
    return new DashboardPage(this.page);
  }
}
