import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import {StepLogger} from '../../utils/stepLogger';

export class AccountCreatedPage extends BasePage {
  readonly continueBtn: Locator;
  readonly accountCreatedTxt: Locator;

  constructor(page: Page) {
    super(page);

    this.continueBtn = page.locator('[data-qa="continue-button"]');
    this.accountCreatedTxt = page.locator('[data-qa="account-created"]');
  }

  async clickContinue(): Promise<void> {
    await StepLogger.step(`'Click Continue button on Account Created page`,async()=>{
      StepLogger.debug('Clicking continue button');
      await this.continueBtn.click();
    });
  }
}
