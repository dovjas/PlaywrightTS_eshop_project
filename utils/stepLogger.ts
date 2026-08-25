import { test } from '@playwright/test';
import { logger } from './logger';

export class StepLogger {
  /**
   * Wraps an action inside a Playwright test step and records structured logs.
   */
  static async step<T>(stepName: string, action: () => Promise<T>): Promise<T> {
    logger.info(`[STEP START] ${stepName}`);

    return await test.step(stepName, async () => {
      try {
        const result = await action();
        logger.info(`[STEP PASSED] ${stepName}`);
        return result;
      } catch (error) {
        logger.error(`[STEP FAILED] ${stepName}`, { error });
        throw error;
      }
    });
  }

  static info(message: string, meta?: object): void {
    logger.info(message, meta);
  }

  static error(message: string, error?: unknown): void {
    logger.error(message, { error });
  }

  static debug(message: string, meta?: object): void {
    logger.debug(message, meta);
  }
}
