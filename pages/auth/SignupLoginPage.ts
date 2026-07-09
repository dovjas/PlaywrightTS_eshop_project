import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export interface NewUser {
  name: string;
  email: string;
}

export class SignupLoginPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupBtn: Locator;
  readonly headerTxt:Locator;
  
  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupBtn = page.getByRole('button', { name: 'Signup' });
    this.headerTxt = page.locator('.signup-form h2');
  }

  async newUserSignup(name: string, email: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupBtn.click();
  }
}
