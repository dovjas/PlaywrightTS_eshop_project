import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  protected readonly baseURL: string;
  protected readonly consentBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'https://www.automationexercise.com/';
    this.consentBtn = page.getByRole('button', { name: 'Consent' });
   
    this.consentHandler();
    this.adBlockHandler();
  }

  async navigate(path: string = '/'): Promise<void> {
    const url = path.startsWith('http') ? path : `${this.baseURL}${path}`;
    console.log(`[BasePage] Navigating to: ${url}`);

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
  private consentHandler(): void {
    this.page.addLocatorHandler(this.consentBtn, async () => {
      console.log(
        '[BasePage] Consent banner detected. Dismissing automatically...',
      );
      await this.consentBtn.click();
    });
  }

  private adBlockHandler(): void {
    this.page.route('**/*google*/**', (route) => route.abort());
  }
}
