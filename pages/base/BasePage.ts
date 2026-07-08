import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  readonly baseUrl: string;
  readonly consentBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'https://www.automationexercise.com/';
    this.consentBtn = page.getByRole('button', { name: 'Consent' });
  }

  async navigate(path: string = '/'): Promise<void> {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    console.log('URL IS THIS', url);
    this.page.on('close', () => {
      console.log('PAGE CLOSED');
    });

    this.page.on('crash', () => {
      console.log('PAGE CRASHED');
    });

    this.page.on('pageerror', (error) => {
      console.log('PAGE ERROR:', error);
    });

    this.page.on('requestfailed', (request) => {
      console.log('FAILED:', request.url(), request.failure()?.errorText);
    });
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.acceptConsentIfPresent();
  }

  async acceptConsentIfPresent() {
    try {
      await this.consentBtn.click();
      console.log('Consent banner accepted successfully');
    } catch (err) {
      console.log('Consent banner not present or already accepted');
    }
  }
}
