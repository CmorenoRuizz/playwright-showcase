import { type Page, type Locator } from '@playwright/test';

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  async fillForm(firstName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.postalCodeInput.fill(postalCode);
  }

  async goToPage() {
    await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
  }
}