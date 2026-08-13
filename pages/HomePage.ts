import { Page, Locator, Expect, expect } from '@playwright/test';
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
  readonly subscribtionInput: Locator;
  readonly submitSubsrcibtionBtn: Locator;
  readonly subscriptionSuccessTxt: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation
    this.signupLoginBtn = page.getByRole('link', { name: /Signup \/ Login/i });
    this.deleteAccBtn = page.locator('li:has-text(" Delete Account")');
    this.logoutBtn = page.locator('a[href="/logout"]');
    this.contactUsBtn = page.locator('[href="/contact_us"]');
    this.productsBtn = page.locator('[href="/products"]');
    this.cartBtn = page.locator('[href="/view_cart"]');

    // User status
    this.loggedInAsTxt = page.locator('li b').last();
    this.accDeletedTxt = page.locator('[data-qa="account-deleted"]');

    // Products
    this.productCards = page.locator('.single-products');

    // Subscription
    this.subscriptionH2Txt = page.locator('.single-widget h2');
    this.subscribtionInput = page.locator('#susbscribe_email');
    this.submitSubsrcibtionBtn = page.locator('#subscribe');
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

  async logout():Promise<void>{
    await  this.logoutBtn.click()
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccBtn.click();
  }

  async subscribe(email: string): Promise<void> {
    this.page.locator('footer').scrollIntoViewIfNeeded();
    await this.subscribtionInput.fill(email);
    await this.submitSubsrcibtionBtn.click();
  }
}
