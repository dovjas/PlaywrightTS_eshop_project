import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class ProductDetail extends BasePage {
  productName: Locator;
  productCategory: Locator;
  productPrice: Locator;
  productAvailability: Locator;
  productCondition: Locator;
  productBrand: Locator;

  constructor(page: Page) {
    super(page)
    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p');
    this.productPrice = page.locator('.product-information span span');
    this.productAvailability = page.locator(
      '.product-information p:has-text("Availability")',
    );
    this.productCondition = page.locator(
      '.product-information p:has-text("Condition")',
    );
    this.productBrand = page.locator(
      '.product-information p:has-text("Brand")',
    );
  }
  getProductName() {
    return this.productName;
  }

  getPorductCategory() {
    return this.productCategory.first();
  }
  getProductPrice() {
    return this.productPrice;
  }

  getproductAvailability() {
    return this.productAvailability;
  }

  getProductCondition() {
    return this.productCondition;
  }

  getProductBrand() {
    return this.productBrand;
  }
}
