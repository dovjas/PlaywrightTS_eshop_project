import { Page, Locator } from '@playwright/test';

export class HomePage {
  //locators
  readonly page: Page;
  readonly signupLoginBtn: Locator;
  readonly loggedInAsTxt: Locator;
  readonly deleteAccBtn:Locator;
  readonly accDeletedTxt:Locator
  //constructor
  constructor(page: Page) {
    this.page = page;
    this.signupLoginBtn = page.getByRole('link', { name: /Signup \/ Login/i });
    this.loggedInAsTxt = page.locator('li b').last();
    this.deleteAccBtn = page.locator('li:has-text(" Delete Account")');
    this.accDeletedTxt = page.locator('[data-qa="account-deleted"]');
  }
  //actions
  async goToSignupLogin() {
    await this.signupLoginBtn.click();
  }

  async deleteAccount(){
    await this.deleteAccBtn.click();
  }
}
