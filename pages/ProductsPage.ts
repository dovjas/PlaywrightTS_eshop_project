import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  page: Page;
  allProductsCards: Locator;
  searchInput: Locator;
  submitSearchtBtn: Locator;
  viewProductBtn: Locator;
  viewCartBtn:Locator;
  addToCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProductsCards = page.locator('.single-products');
    this.searchInput = page.locator('#search_product');
    this.submitSearchtBtn = page.locator('#submit_search');
    this.viewProductBtn = page.locator('.choose');
    this.viewCartBtn = page.locator('.modal-content [href="/view_cart"]');
    this.addToCartBtn = page.locator('.productinfo .add-to-cart');
  }

  async goToProduct() {}

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.submitSearchtBtn.click();
  }
  async productSearchResult(productName: string) {
    const results = await this.page.locator(
      `.single-products .productinfo p:has-text("${productName}")`,
    );
    return results;
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async viewCart(){
    await this.viewCartBtn.click();
  }
}
