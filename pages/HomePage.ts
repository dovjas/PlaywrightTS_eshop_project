import { Page, Locator, Expect, expect } from '@playwright/test';
import { BasePage } from './base/BasePage.ts';

export class HomePage extends BasePage {
  readonly signupLoginBtn: Locator;
  readonly loggedInAsTxt: Locator;
  readonly deleteAccBtn:Locator;
  readonly accDeletedTxt:Locator;
  readonly productCards:Locator;

  constructor(page: Page) {
    super(page)

    this.signupLoginBtn = page.getByRole('link', { name: /Signup \/ Login/i });
    this.loggedInAsTxt = page.locator('li b').last();
    this.deleteAccBtn = page.locator('li:has-text(" Delete Account")');
    this.accDeletedTxt = page.locator('[data-qa="account-deleted"]');
    this.productCards = page.locator('.single-products');
  }

  async goToSignupLogin() {
    await this.signupLoginBtn.click();
  }

  async deleteAccount(){
    await this.deleteAccBtn.click();
  }
}
