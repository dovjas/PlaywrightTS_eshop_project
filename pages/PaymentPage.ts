import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { StepLogger } from '../utils/stepLogger';


interface CardDetails {
  cardName: string;
  cardNumber: string;
  cvc: string;
  month: string;
  year: string;
}

export class PaymentPage extends BasePage {
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expirationInput: Locator;
  readonly yearInput: Locator;
  readonly confirmOrderBtn: Locator;
  readonly successMsg: Locator;

  constructor(page: Page) {
    super(page);

    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expirationInput = page.locator('[data-qa="expiry-month"]');
    this.yearInput = page.locator('[data-qa="expiry-year"]');
    this.confirmOrderBtn = page.locator('[data-qa="pay-button"]');
    this.successMsg = page.locator('#success_message .alert-success');
  }

  async enterCardDetails(card: CardDetails): Promise<void> {
    await StepLogger.step('Enter credit card payment details', async () => {
      StepLogger.debug('Filling payment form details')
    await this.nameOnCardInput.fill(card.cardName);
    await this.cardNumberInput.fill(card.cardNumber);
    await this.cvcInput.fill(card.cvc);
    await this.expirationInput.fill(card.month);
    await this.yearInput.fill(card.year);
  })
  }

  async getSuccessMsg(): Promise<string> {
    return StepLogger.step(`Fetch payment success message text`, async()=>{
      StepLogger.debug(`Success message text retrieved`);
      return this.successMsg.innerText();
    });
  }

  async payAndConfirmOrder(): Promise<void> {
    await StepLogger.step('Click Pay and Confirm Order button', async () => {
      StepLogger.debug('Clicking Pay and Confirm Order');
    await this.confirmOrderBtn.click();
    })
  }
}
