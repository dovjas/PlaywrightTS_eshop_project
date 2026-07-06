import { Locator, Page } from '@playwright/test';

export class AccountCreatedPage {
  page: Page;
  continueBtn: Locator;
  accountCreatedTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueBtn = page.locator('[data-qa="continue-button"]');
    this.accountCreatedTxt = page.locator('[data-qa="account-created"]');
  }

  async clickContinue() {
    await this.continueBtn.click();
  }
}
