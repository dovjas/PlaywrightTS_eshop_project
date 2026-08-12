import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/auth/SignupLoginPage';
import { SignupFormPage } from '../pages/auth/SignupFormPage';
import { AccountCreatedPage } from '../pages/auth/AccountCreatedPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetail } from '../pages/ProductDetail';
import { ContactUsPage } from '../pages/ContactUsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { PaymentDonePage } from '../pages/PaymentDonePage';

type PageObjects = {
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
  signupFormPage: SignupFormPage;
  accountCreatedPage: AccountCreatedPage;
  productsPage: ProductsPage;
  productDetail: ProductDetail;
  contactUsPage: ContactUsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  paymentDonePage: PaymentDonePage;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupLoginPage: async ({ page }, use) => {
    await use(new SignupLoginPage(page));
  },
  signupFormPage: async ({ page }, use) => {
    await use(new SignupFormPage(page));
  },
  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetail: async ({ page }, use) => {
    await use(new ProductDetail(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  paymentDonePage: async ({ page }, use) => {
    await use(new PaymentDonePage(page));
  },
});

export { expect };
