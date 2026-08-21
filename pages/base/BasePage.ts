import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  protected readonly baseURL: string;
  protected readonly consentBtn: Locator;
  protected readonly closeAdBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'https://www.automationexercise.com/';
    this.consentBtn = page.getByRole('button', { name: 'Consent' });
    this.closeAdBtn = page
      .locator('.continue-prompt-text')
      .or(page.frameLocator('iframe[name^="aswift_"]').locator('#dismiss-button'));

    this.consentHandler();
    // this.addHandler();
    this.blockAds();
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

  private addHandler():void {
    this.page.addLocatorHandler(this.closeAdBtn, async () => {
      console.log(
        '[BasePage] Add banner detected. Dismissing automatically...',
      );
      await this.closeAdBtn.click();
    });
  }

  private blockAds():void{
    this.page.route('**/*google*/**',(route)=> route.abort());
  }
}
