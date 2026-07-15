import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base/BasePage.ts';

export class ContactUsPage extends BasePage {
  getInTouchHeaderTxt: Locator;
  nameInput: Locator;
  emailInput: Locator;
  subjectInput: Locator;
  msgTextArea: Locator;
  submitBtn: Locator;
  chooseFileBtn: Locator;
  submitSuccessTxt: Locator;

  constructor(page: Page) {
    super(page);

    this.getInTouchHeaderTxt = page.locator('.contact-form h2');
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.getByRole('textbox', { name: 'Subject' });
    this.msgTextArea = page.getByRole('textbox', {
      name: 'Your Message Here',
    });
    this.chooseFileBtn = page.locator('input[type="file"]');
    this.submitBtn = page.locator('[data-qa="submit-button"]');
    this.submitSuccessTxt = page.locator('.contact-form .status');
  }

  async submitContactForm(
    name: string,
    email: string,
    subject: string,
    message: string,
  ) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.msgTextArea.fill(message);

    this.page.once("dialog", (dialog) => dialog.accept());
		await this.submitBtn.click();
  }

  async acceptAlert() {
    this.page.once('dialog', (dialog) => {
      console.log('Alert message:', dialog.message());
      dialog.accept();
    });
  }
}
