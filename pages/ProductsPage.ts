import { Page, Locator } from '@playwright/test';
import {BasePage} from './base/BasePage';

export class ProductsPage extends BasePage {
  readonly allProductsCards: Locator;
  readonly searchInput: Locator;
  readonly submitSearchtBtn: Locator;
  readonly viewProductBtn: Locator;
  readonly viewCartBtn: Locator;
  readonly addToCartBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.allProductsCards = page.locator('.single-products');
    this.searchInput = page.locator('#search_product');
    this.submitSearchtBtn = page.locator('#submit_search');
    this.viewProductBtn = page.locator('.choose');
    this.viewCartBtn = page.locator('.modal-content [href="/view_cart"]');
    this.addToCartBtn = page.locator('.productinfo .add-to-cart');
  }

  async goToProduct() {}

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.submitSearchtBtn.click();
  }

  async productSearchResult(productName: string):Promise<Locator> {
    return this.page.locator(
      `.single-products .productinfo p:has-text("${productName}")`,
    );
  }

  async addToCart(): Promise<void> {
    await this.addToCartBtn.click();
  }

  async viewCart(): Promise<void> {
    await this.viewCartBtn.click();
  }
}
