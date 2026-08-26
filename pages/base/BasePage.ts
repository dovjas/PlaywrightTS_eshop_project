import { Page, Locator } from '@playwright/test';
import { StepLogger } from '../../utils/stepLogger';

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
    await StepLogger.step(`[BasePage] Navigating to: ${url}`, async () => {
      try {
        await this.page.goto(url, {
          waitUntil: 'domcontentloaded',
        });
        await this.page.waitForLoadState();
        StepLogger.debug(
          `[BasePage] Successfully navigated to: ${this.page.url()}`,
        );
      } catch (err) {
        StepLogger.debug(`[BasePage] Navigation failed to ${url}`);
        throw err;
      }
    });
  }

  private consentHandler(): void {
    this.page.addLocatorHandler(this.consentBtn, async () => {
     StepLogger.debug(
       '[BasePage] Consent banner detected. Dismissing automatically...',
     );
      await this.consentBtn.click();
    });
  }

  private adBlockHandler(): void {
    this.page.route('**/*google*/**', (route) => route.abort());
    this.page.route('**/*doubleclick*/**', (route) => route.abort());
    this.page.route('**/*adservice*/**', (route) => route.abort());
    this.page.route('**/*pagead*/**', (route) => route.abort());
  }
}
