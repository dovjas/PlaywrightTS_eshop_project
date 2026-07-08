import { Page, Locator } from '@playwright/test';

export interface NewUserData {
  email:string,
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

export class SignupFormPage {
  page: Page;
  headerTxt: Locator;
  titleMrRadio: Locator;
  titleMrsRadio: Locator;
  passwordInput: Locator;
  dateOfBirthDaySel: Locator;
  dateOfBirthMonthSel: Locator;
  dateOfBirthYearSel: Locator;
  newsletterCbox: Locator;
  specOffersCbox: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  addressInput: Locator;
  countrySel: Locator;
  stateInput: Locator;
  cityInput: Locator;
  zipCodeInput: Locator;
  mobileNumbInput: Locator;
  createAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;
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
    // Select Title
    if (userData.title === 'Mr') {
      await this.titleMrRadio.check();
    } else {
      await this.titleMrsRadio.check();
    }

    await this.passwordInput.fill(userData.password);

    // Date of Birth
    if (userData.dobDay)
      await this.dateOfBirthDaySel.selectOption({ label: userData.dobDay });
    if (userData.dobMonth)
      await this.dateOfBirthMonthSel.selectOption({ label: userData.dobMonth });
    if (userData.dobYear)
      await this.dateOfBirthYearSel.selectOption({ label: userData.dobYear });

    // Checkboxes
    await this.newsletterCbox.check();
    await this.specOffersCbox.check();

    // Personal Information
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.addressInput.fill(userData.address);

    // Address
    await this.countrySel.selectOption({ label: userData.country });
    if (userData.state) await this.stateInput.fill(userData.state);
    if (userData.city) await this.cityInput.fill(userData.city);
    await this.zipCodeInput.fill(userData.zipCode);
    await this.mobileNumbInput.fill(userData.mobileNumber);

    await this.createAccountBtn.click();
  }
}
