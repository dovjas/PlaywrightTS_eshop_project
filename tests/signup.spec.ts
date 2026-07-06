import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { BasePage } from '../pages/base/BasePage.ts';
import { SignupLoginPage } from '../pages/auth/SignupLoginPage.ts';
import { SignupFormPage } from '../pages/auth/SignupFormPage.ts';
import { AccountCreatedPage } from '../pages/auth/AccountCreatedPage.ts';
import { testUser } from '../testData/users.ts';

test('Test Case 1: User signup @signup', async ({ page }) => {
  const homePage = new HomePage(page);
  const basePage = new BasePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const signupFormPage = new SignupFormPage(page);
  const accountCreatedPage = new AccountCreatedPage(page);

  // Step 1: Go to Home Page
  await basePage.navigate();
  await basePage.acceptConsentIfPresent();

  // Step 2: Go to Signup/Login page
  await homePage.goToSignupLogin();
  expect(await signupLoginPage.headerText.textContent()).toContain(
    'New User Signup!',
  );
  // Step 3: Enter Name and Email
  await signupLoginPage.newUserSignup('Jonas', 'a@aj.lt');

  // Step 4: Fill full registration form
  expect(await signupFormPage.headerTxt.textContent()).toContain(
    'Enter Account Information',
  );
  await signupFormPage.completeRegistration(testUser);
  expect(await accountCreatedPage.accountCreatedTxt.innerText()).toContain(
    'ACCOUNT CREATED!',
  );
  await accountCreatedPage.clickContinue();
});
