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
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    // await this.acceptConsentIfPresent();

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
