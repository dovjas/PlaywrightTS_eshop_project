import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { StepLogger } from '../../utils/stepLogger';

export interface NewUser {
  name: string;
  email: string;
}

export class SignupLoginPage extends BasePage {
  // Signup
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupBtn: Locator;
  readonly newUserHeaderTxt: Locator;

  // Login
  readonly loginHeaderTxt: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginBtn: Locator;
  readonly invalidLoginErrMsg: Locator;

  constructor(page: Page) {
    super(page);

    // Signup locators
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupBtn = page.getByRole('button', { name: 'Signup' });
    this.newUserHeaderTxt = page.locator('.signup-form h2');

    // Login locators
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.loginHeaderTxt = page.locator('.login-form h2');
    this.invalidLoginErrMsg = page.locator('.login-form p');
  }

  async newUserSignup(name: string, email: string): Promise<void> {
    await StepLogger.step(`New user signup: ${email}`, async () => {
      StepLogger.debug('Filling name input');
      await this.nameInput.fill(name);

      StepLogger.debug('Filling email input');
      await this.emailInput.fill(email);

      StepLogger.debug('Clicking signup button');
      await this.signupBtn.click();
    });
  }

  async userLogin(email: string, password: string): Promise<void> {
    await StepLogger.step(`Login with email: ${email}`, async () => {
      StepLogger.debug('Filling login credentials');
      await this.loginEmailInput.fill(email);
      await this.loginPasswordInput.fill(password);

      StepLogger.debug('Clicking Login button');
      await this.loginBtn.click();
    });
  }
}
