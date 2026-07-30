import { Page, Locator } from '@playwright/test';

interface CardDetails {
  cardName: string;
  cardNumber: string;
  cvc: string;
  month: string;
  year: string;
}

export class PaymentPage {
  page: Page;
  nameOnCardInput: Locator;
  cardNumberInput: Locator;
  cvcInput: Locator;
  expirationInput: Locator;
  yearInput: Locator;
  confirmOrderBtn: Locator;
  successMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expirationInput = page.locator('[data-qa="expiry-month"]');
    this.yearInput = page.locator('[data-qa="expiry-year"]');
    this.confirmOrderBtn = page.locator('[data-qa="pay-button"]');
    this.successMsg = page.locator('#success_message .alert-success');
  }

  async enterCardDetails(card: CardDetails) {
    await this.nameOnCardInput.fill(card.cardName);
    await this.cardNumberInput.fill(card.cardNumber);
    await this.cvcInput.fill(card.cvc);
    await this.expirationInput.fill(card.month);
    await this.yearInput.fill(card.year);
  }

  async getSuccessMsg() {
    return this.successMsg.innerText();
  }

  async payAndConfirmOrder() {
    await this.confirmOrderBtn.click();
  }
}
