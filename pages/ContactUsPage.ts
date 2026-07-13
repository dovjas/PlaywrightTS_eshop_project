import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage.ts';

export class ContactUsPage extends BasePage {
  getInTouchHeaderTxt:Locator;
  nameInput: Locator;
  emailInput: Locator;
  subjectInput: Locator;
  msgTextArea: Locator;
  submitBtn: Locator;
  chooseFileBtn:Locator;

  constructor(page: Page) {
    super(page);

    this.getInTouchHeaderTxt = page.locator('.contact-form h2');
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.subjectInput = page.getByRole('textbox', { name: 'Subject' });
    this.msgTextArea = page.getByRole('textbox', {
      name: 'Your Message Here',
    });
    this.chooseFileBtn = page.locator('input[type="file"]');
    this.submitBtn = page.locator('[data-qa="submit-button"]');
  }


  async submitContactForm(name:string,email:string,subject:string,message:string){
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.msgTextArea.fill(message);
    await this.submitBtn.click();
  }
}
