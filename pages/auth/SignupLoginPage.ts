import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage.ts';

export interface NewUser {
  name: string;
  email: string;
}

export class SignupLoginPage extends BasePage {
  //locator
  readonly page: Page;
  readonly name: Locator;
  readonly email: Locator;
  readonly signupBtn: Locator;
  readonly headerText:Locator;
  
  constructor(page: Page) {
    super(page);

    this.page = page;
    this.name = page.getByRole('textbox', { name: 'Name' });
    this.email = page.locator('input[data-qa="signup-email"]');
    this.signupBtn = page.getByRole('button', { name: 'Signup' });
    this.headerText = page.locator('.signup-form h2');
  }

  async newUserSignup(name: string, email: string): Promise<void> {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.signupBtn.click();
  }
}
