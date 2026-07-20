import { Locator, Page } from '@playwright/test';

export class CartPage {
  page: Page;
  productNameTxt: Locator;
  productCategoryTxt: Locator;
  productPriceTxt: Locator;
  productQuantityTxt: Locator;
  totalPriceTxt:Locator;
  proceedToCheckoutBtn: Locator;
  //constructor

  constructor(page: Page,productName:string) {
    this.page=page;
    this.productNameTxt = page.getByRole('link', { name: `Lace Top For Women` });
    this.productCategoryTxt = page.locator('.cart_description p');
    this.productPriceTxt = page.locator('.cart_price p');
    this.productQuantityTxt = page.locator('.cart_quantity button');
    this.totalPriceTxt = page.locator('.cart_total_price');
    this.proceedToCheckoutBtn = page.locator('a.check_out');
    
  }
  async verifyCartDetails() {
    const name = await this.productNameTxt.innerText();
    const category = await this.productCategoryTxt.innerText();
    const price = await this.productPriceTxt.innerText();
    const quantity = await this.productQuantityTxt.innerText();
    const totalPrice = await this.totalPriceTxt.innerText();
    console.log({
      name:name,
      category:category,
      price:price,
      quantity:quantity,
      totalPrice:totalPrice
    })
  }
}
