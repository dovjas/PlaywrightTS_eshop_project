import { Locator, Page } from '@playwright/test';

interface ProductItem{
  name:string,
  category:string,
  price:string,
  quantity:string,
  totalPrice:string,
}


export class CartPage {
  page: Page;
  productNameTxt: Locator;
  productCategoryTxt: Locator;
  productPriceTxt: Locator;
  productQuantityTxt: Locator;
  totalPriceTxt:Locator;
  proceedToCheckoutBtn: Locator;
  //constructor

  constructor(page: Page) {
    this.page=page;
    this.productNameTxt = page.getByRole('link', { name: `Lace Top For Women` });
    this.productCategoryTxt = page.locator('.cart_description p');
    this.productPriceTxt = page.locator('.cart_price p');
    this.productQuantityTxt = page.locator('.cart_quantity button');
    this.totalPriceTxt = page.locator('.cart_total_price');
    this.proceedToCheckoutBtn = page.locator('a.check_out');
    
  }
  async getCartDetails() {
   return {
      name : await this.productNameTxt.innerText(),
      category : await this.productCategoryTxt.innerText(),
      price : await this.productPriceTxt.innerText(),
      quantity : await this.productQuantityTxt.innerText(),
      totalPrice : await this.totalPriceTxt.innerText(),
    }
  }
}
