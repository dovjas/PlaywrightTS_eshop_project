import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage.ts';

export class HomePage extends BasePage {

  readonly page: Page;
  readonly signupLoginBtn: Locator;
  readonly loggedInAsTxt: Locator;
  readonly deleteAccBtn: Locator;
  readonly accDeletedTxt: Locator;

  constructor(page: Page) {
    super(page)

    this.page = page;
    // use a stable locator for the signup/login link
    this.signupLoginBtn = page.locator('a:has-text("Signup / Login")');
    this.loggedInAsTxt = page.locator('li b').last();
    this.deleteAccBtn = page.locator('li:has-text(" Delete Account")');
    this.accDeletedTxt = page.locator('[data-qa="account-deleted"]');
  }

  async goToSignupLogin() {
    // ensure the page has started loading and the element is visible
    await this.page.waitForLoadState('domcontentloaded');

    // wait for the signup/login link to be visible
    await this.signupLoginBtn.waitFor({ state: 'visible', timeout: 10000 });

    // click and wait for navigation in parallel to avoid race conditions
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }),
      this.signupLoginBtn.click({ timeout: 10000 }),
    ]);
  }

  async deleteAccount(){
    await this.deleteAccBtn.click();
  }
}
