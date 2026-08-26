import { Locator, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';
import {StepLogger} from '../utils/stepLogger';

interface ProductItem{
  name:string,
  category:string,
  price:string,
  quantity:string,
  totalPrice:string,
}


export class CartPage extends BasePage {
  readonly productNameTxt: Locator;
  readonly productCategoryTxt: Locator;
  readonly productPriceTxt: Locator;
  readonly productQuantityTxt: Locator;
  readonly totalPriceTxt:Locator;
  readonly proceedToCheckoutBtn: Locator;

  constructor(page: Page) {
    super(page)

    this.productNameTxt = page.getByRole('link', { name: `Lace Top For Women` });
    this.productCategoryTxt = page.locator('.cart_description p');
    this.productPriceTxt = page.locator('.cart_price p');
    this.productQuantityTxt = page.locator('.cart_quantity button');
    this.totalPriceTxt = page.locator('.cart_total_price');
    this.proceedToCheckoutBtn = page.locator('a.check_out');
    
  }
  async getCartDetails():Promise<ProductItem> {
    return await StepLogger.step(`Fetch cart row details for`, async()=>{
      return {
         name : await this.productNameTxt.innerText(),
         category : await this.productCategoryTxt.innerText(),
         price : await this.productPriceTxt.innerText(),
         quantity : await this.productQuantityTxt.innerText(),
         totalPrice : await this.totalPriceTxt.innerText(),
       }
    });
  }
}
