import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  protected readonly baseURL: string;
  protected readonly consentBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'https://www.automationexercise.com/';
    this.consentBtn = page.getByRole('button', { name: 'Consent' });
  }

  async navigate(path: string = '/'): Promise<void> {
    const url = path.startsWith('http') ? path : `${this.baseURL}${path}`;
    console.log(`[BasePage] Navigating to: ${this.baseURL}`);

    try {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
      });
      await this.acceptConsentIfPresent();
      await this.page.waitForLoadState();
      console.log(`[BasePage] Successfully navigated to: ${this.page.url()}`);
    } catch (err) {
      console.error(`[BasePage] Navigation failed to ${url}`, err);
      throw err;
    }
  }

  async acceptConsentIfPresent() {
    try {
      await this.consentBtn.waitFor({ state: 'visible', timeout: 8000 });
      await this.consentBtn.click();
      console.log('Consent banner accepted successfully');
    } catch {
      console.log('No consent banner found or already accepted');
    }
  }
}
