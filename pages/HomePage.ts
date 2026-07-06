import {Page,Locator} from '@playwright/test';

export class HomePage {
  //locators
  readonly page: Page;
  readonly signupLoginBtn: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.signupLoginBtn = page.getByRole('link', { name: /Signup \/ Login/i });
  }
  //actions
  async goToSignupLogin() {
    await this.signupLoginBtn.click();
  }
}