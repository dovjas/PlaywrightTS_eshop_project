import { Page, Locator } from '@playwright/test';
import { StepLogger } from '../../utils/stepLogger';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/'): Promise<void> {
    await StepLogger.step(`[BasePage] Navigating to: ${path}`, async () => {
      try {
        await this.page.goto(path, {
          waitUntil: 'domcontentloaded',
        });
        await this.page.waitForLoadState();
        StepLogger.debug(
          `[BasePage] Successfully navigated to: ${this.page.url()}`,
        );
      } catch (err) {
        StepLogger.debug(`[BasePage] Navigation failed to ${path}`);
        throw err;
      }
    });
  }
}
