import { Page, Locator } from '@playwright/test';
import { StepLogger } from '../../utils/stepLogger';

export abstract class BasePage {
  protected page: Page;
  protected readonly consentBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.consentBtn = page.getByRole('button', { name: 'Consent' });
    this.consentHandler();
    this.adBlockHandler();
  }

  async navigate(path: string = '/'): Promise<void> {
    await StepLogger.step(`[BasePage] Navigating to: ${path}`, async () => {
      try {
        await this.page.goto(path, {
          waitUntil: 'domcontentloaded',
        });
        // await this.page.waitForLoadState();
        StepLogger.debug(
          `[BasePage] Successfully navigated to: ${this.page.url()}`,
        );
      } catch (err) {
        StepLogger.debug(`[BasePage] Navigation failed to ${path}`);
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
