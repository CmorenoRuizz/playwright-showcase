import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly shoppingCartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async addProductToCart(productName: string) {
    const productContainer = this.page.locator('.inventory_item').filter({ hasText: productName });
    await productContainer.getByRole('button', { name: 'Add to cart' }).click();
  }

  async getCartCount(): Promise<number> {
    const countText = await this.shoppingCartBadge.textContent();
    return parseInt(countText || '0');
  }

  async sortProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }
}