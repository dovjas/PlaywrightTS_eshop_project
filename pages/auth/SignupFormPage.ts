import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { StepLogger } from '../../utils/stepLogger';

export interface NewUserData {
  email: string;
  title?: 'Mr' | 'Mrs';
  password: string;
  dobDay?: string;
  dobMonth?: string;
  dobYear?: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state?: string;
  city?: string;
  zipCode: string;
  mobileNumber: string;
}

export class SignupFormPage extends BasePage {
  readonly headerTxt: Locator;
  readonly titleMrRadio: Locator;
  readonly titleMrsRadio: Locator;
  readonly passwordInput: Locator;
  readonly dateOfBirthDaySel: Locator;
  readonly dateOfBirthMonthSel: Locator;
  readonly dateOfBirthYearSel: Locator;
  readonly newsletterCbox: Locator;
  readonly specOffersCbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countrySel: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipCodeInput: Locator;
  readonly mobileNumbInput: Locator;
  readonly createAccountBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.headerTxt = page.locator('.login-form h2').first();
    this.titleMrRadio = page.locator('#id_gender1');
    this.titleMrsRadio = page.locator('#id_gender2');
    this.passwordInput = page.locator('#password');
    this.dateOfBirthDaySel = page.locator('#days');
    this.dateOfBirthMonthSel = page.locator('#months');
    this.dateOfBirthYearSel = page.locator('#years');
    this.newsletterCbox = page.locator('#newsletter');
    this.specOffersCbox = page.locator('#optin');
    this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
    this.addressInput = page.locator('#address1');
    this.countrySel = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipCodeInput = page.locator('#zipcode');
    this.mobileNumbInput = page.locator('#mobile_number');
    this.createAccountBtn = page.getByRole('button', {
      name: 'Create Account',
    });
  }

  async completeRegistration(userData: NewUserData): Promise<void> {
    StepLogger.step(
      `Complete registration form for: ${userData.email}`,
      async () => {
        await this.selectTitle(userData.title);
        StepLogger.debug('Filling user password');
        await this.passwordInput.fill(userData.password);
        await this.fillDoB(userData);
        await this.handleCheckboxes();
        await this.fillPersonalInfo(userData);
        await this.fillAddressInfo(userData);

        StepLogger.debug('Clicking Create Account button');
        await this.createAccountBtn.click();
      },
    );
  }

  private async selectTitle(title?: 'Mr' | 'Mrs'): Promise<void> {
    if (title === 'Mr') {
      await this.titleMrRadio.check();
    } else {
      await this.titleMrsRadio.check();
    }
  }

  private async fillDoB(userData: NewUserData): Promise<void> {
    StepLogger.debug(
      `Selecting DoB: ${userData.dobDay}/${userData.dobMonth}/${userData.dobYear}`,
    );
    if (userData.dobDay)
      await this.dateOfBirthDaySel.selectOption({ label: userData.dobDay });
    if (userData.dobMonth)
      await this.dateOfBirthMonthSel.selectOption({ label: userData.dobMonth });
    if (userData.dobYear)
      await this.dateOfBirthYearSel.selectOption({ label: userData.dobYear });
  }

  private async handleCheckboxes(): Promise<void> {
    await this.newsletterCbox.check();
    await this.specOffersCbox.check();
  }

  private async fillPersonalInfo(userData: NewUserData): Promise<void> {
    StepLogger.debug(
      `Filling personal info: ${userData.firstName} ${userData.lastName}`,
    );
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.addressInput.fill(userData.address);
  }

  private async fillAddressInfo(userData: NewUserData): Promise<void> {
    StepLogger.debug(`Filling address info: ${userData.country}`);
    await this.countrySel.selectOption({ label: userData.country });
    if (userData.state) await this.stateInput.fill(userData.state);
    if (userData.city) await this.cityInput.fill(userData.city);
    await this.zipCodeInput.fill(userData.zipCode);
    await this.mobileNumbInput.fill(userData.mobileNumber);
  }
}
