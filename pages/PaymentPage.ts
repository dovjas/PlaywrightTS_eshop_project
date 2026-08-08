import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

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
    await this.nameOnCardInput.fill(card.cardName);
    await this.cardNumberInput.fill(card.cardNumber);
    await this.cvcInput.fill(card.cvc);
    await this.expirationInput.fill(card.month);
    await this.yearInput.fill(card.year);
  }

  async getSuccessMsg(): Promise<string> {
    return this.successMsg.innerText();
  }

  async payAndConfirmOrder(): Promise<void> {
    await this.confirmOrderBtn.click();
  }
}
