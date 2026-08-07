import { Locator, Page } from '@playwright/test';
import {BasePage} from '../base/BasePage';

export class AccountCreatedPage extends BasePage {
  continueBtn: Locator;
  accountCreatedTxt: Locator;

  constructor(page: Page) {
    super(page);
    
    this.continueBtn = page.locator('[data-qa="continue-button"]');
    this.accountCreatedTxt = page.locator('[data-qa="account-created"]');
  }

  async clickContinue():Promise<void> {
    await this.continueBtn.click();
  }
}
