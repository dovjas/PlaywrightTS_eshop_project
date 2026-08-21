import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  protected readonly baseURL: string;
  protected readonly consentBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'https://www.automationexercise.com/';
    this.consentBtn = page.getByRole('button', { name: 'Consent' });

    this.consenstHandler();
  }

  async navigate(path: string = '/'): Promise<void> {
    const url = path.startsWith('http') ? path : `${this.baseURL}${path}`;
    console.log(`[BasePage] Navigating to: ${this.baseURL}`);

    try {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
      });
      await this.page.waitForLoadState();
      console.log(`[BasePage] Successfully navigated to: ${this.page.url()}`);
    } catch (err) {
      console.error(`[BasePage] Navigation failed to ${url}`, err);
      throw err;
    }
  }
  async consenstHandler(){
    await this.page.addLocatorHandler(this.consentBtn, async()=>{
      console.log(
        '[BasePage] Consent banner detected. Dismissing automatically...',
      );
      await this.consentBtn.click();
    })
  }
}
