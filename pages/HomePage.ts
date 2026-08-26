import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { StepLogger } from '../utils/stepLogger';

export class HomePage extends BasePage {
  // Navigation
  readonly signupLoginBtn: Locator;
  readonly logoutBtn: Locator;
  readonly deleteAccBtn: Locator;
  readonly contactUsBtn: Locator;
  readonly productsBtn: Locator;
  readonly cartBtn: Locator;

  // User status
  readonly loggedInAsTxt: Locator;
  readonly accDeletedTxt: Locator;

  // Products
  readonly productCards: Locator;

  // Subscription
  readonly subscriptionH2Txt: Locator;
  readonly subscriptionInput: Locator;
  readonly submitSubscriptionBtn: Locator;
  readonly subscriptionSuccessTxt: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation
    this.signupLoginBtn = page.getByRole('link', {name: /Signup \/ Login/i });
    this.logoutBtn = page.getByRole('link',{name:'Logout'});
    this.deleteAccBtn = page.getByRole('link',{name:'Delete Account'});
    this.contactUsBtn = page.getByRole('link', { name: 'Contact us' });
    this.productsBtn = page.getByRole('link', { name: 'Products' });
    this.cartBtn = page.getByRole('link', { name: 'Cart' });
    // User status
    this.loggedInAsTxt = page.locator('li b').last();
    this.accDeletedTxt = page.locator('[data-qa="account-deleted"]');

    // Products
    this.productCards = page.locator('.single-products');

    // Subscription
    this.subscriptionH2Txt = page.locator('.single-widget h2');
    this.subscriptionInput = page.locator('#susbscribe_email');
    this.submitSubscriptionBtn = page.locator('#subscribe');
    this.subscriptionSuccessTxt = page.locator('.alert-success');
  }

  async goToSignupLogin(): Promise<void> {
    await StepLogger.step('Navigate to Signup / Login page', async () => {
      StepLogger.debug('Clicking Signup / Login button');
    await this.signupLoginBtn.click();
    })
  }

  async goToContactUs(): Promise<void> {
    await StepLogger.step('Navigate to Contact Us page', async () => {
      StepLogger.debug('Clicking Contact Us button');
    await this.contactUsBtn.click();
    })
  }

  async goToProducts(): Promise<void> {
    await StepLogger.step('Navigate to Products page', async () => {
      StepLogger.debug('Clicking Products button');
    await this.productsBtn.click();
    }) 
  }

  async deleteAccount(): Promise<void> {
    await StepLogger.step('Delete Account', async () => {
      StepLogger.debug('Clicking Delete Account button');
    await this.deleteAccBtn.click();
    })
  }

  async subscribe(email: string): Promise<void> {
    await StepLogger.step(`Subscribe to newsletter with email: ${email}`, async () => {
    
      StepLogger.debug('Scrolling to footer');
    this.page.locator('footer').scrollIntoViewIfNeeded();

    StepLogger.debug(`Filling subscription email: ${email}`);
    await this.subscriptionInput.fill(email);
    
    StepLogger.debug('Clicking subscribe button');
    await this.submitSubscriptionBtn.click();
  })}
}
