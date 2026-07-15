import { Page, Locator, Expect, expect } from '@playwright/test';
import { BasePage } from './base/BasePage.ts';

export class HomePage extends BasePage {
  readonly signupLoginBtn: Locator;
  readonly logoutBtn:Locator; 
  readonly deleteAccBtn:Locator;
  readonly contactUsBtn:Locator;
  readonly productsBtn:Locator;
  readonly loggedInAsTxt: Locator;
  readonly accDeletedTxt:Locator;
  readonly productCards:Locator;

  constructor(page: Page) {
    super(page)

    this.signupLoginBtn = page.getByRole('link', { name: /Signup \/ Login/i });
    this.deleteAccBtn = page.locator('li:has-text(" Delete Account")');
    this.logoutBtn = page.locator('a[href="/logout"]');
    this.contactUsBtn = page.locator('[href="/contact_us"]');
    this.productsBtn = page.locator('[href="/products"]');
    this.accDeletedTxt = page.locator('[data-qa="account-deleted"]');
    this.loggedInAsTxt = page.locator('li b').last();
    this.productCards = page.locator('.single-products');
  }

  async goToSignupLogin() {
    await this.signupLoginBtn.click();
  }

  async goToContactUs(){
    await this.contactUsBtn.click();
  }

  async goToProducts(){
    await this.productsBtn.click();
  }

  async deleteAccount(){
    await this.deleteAccBtn.click();
  }
}
