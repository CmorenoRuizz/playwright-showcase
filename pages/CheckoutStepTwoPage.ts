import { type Page, type Locator } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async goToPage() {
    await this.page.goto('https://www.saucedemo.com/checkout-step-two.html');
  }
}