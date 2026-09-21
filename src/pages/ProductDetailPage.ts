import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class ProductDetail extends BasePage {
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;

  constructor(page: Page) {
    super(page);

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
  getProductName(): Locator {
    return this.productName;
  }

  getPorductCategory(): Locator {
    return this.productCategory.first();
  }
  getProductPrice(): Locator {
    return this.productPrice;
  }

  getproductAvailability(): Locator {
    return this.productAvailability;
  }

  getProductCondition(): Locator {
    return this.productCondition;
  }

  getProductBrand(): Locator {
    return this.productBrand;
  }
}
