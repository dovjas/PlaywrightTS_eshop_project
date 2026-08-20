import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage.ts';

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
    await this.signupLoginBtn.click();
  }

  async goToContactUs(): Promise<void> {
    await this.contactUsBtn.click();
  }

  async goToProducts(): Promise<void> {
    await this.productsBtn.click();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccBtn.click();
  }

  async subscribe(email: string): Promise<void> {
    this.page.locator('footer').scrollIntoViewIfNeeded();
    await this.subscriptionInput.fill(email);
    await this.submitSubscriptionBtn.click();
  }
}
