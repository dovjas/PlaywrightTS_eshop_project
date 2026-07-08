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
  console.log('Before goto');
  console.log('Closed?', this.page.isClosed());

  const response = await this.page.goto(url);

  console.log('After goto');
  console.log('Closed?', this.page.isClosed());
  console.log('URL:', this.page.url());
  console.log('Status:', response?.status());

    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.acceptConsentIfPresent();
     console.log('After consent');
     console.log('Closed?', this.page.isClosed());
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
