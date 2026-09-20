import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { StepLogger } from '../utils/stepLogger';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactUsPage extends BasePage {
  readonly getInTouchHeaderTxt: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly msgTextArea: Locator;
  readonly submitBtn: Locator;
  readonly chooseFileBtn: Locator;
  readonly submitSuccessTxt: Locator;

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

  async submitContactForm(data:ContactFormData):Promise<void> {
    await StepLogger.step(`Submit contact form`,async()=>{
      StepLogger.debug(`Filling contact form data`)
      await this.nameInput.fill(data.name);
      await this.emailInput.fill(data.email);
      await this.subjectInput.fill(data.subject);
      await this.msgTextArea.fill(data.message);
  
      this.page.once('dialog', (dialog) => dialog.accept());
      StepLogger.debug(`Clicking submit form`);
      await this.submitBtn.click();
    })
  }

  async acceptAlert():Promise<void> {
    this.page.once('dialog', (dialog) => {
      console.log('Alert message:', dialog.message());
      dialog.accept();
    });
  }
}
