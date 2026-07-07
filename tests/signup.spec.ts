import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { BasePage } from '../pages/base/BasePage.ts';
import { SignupLoginPage } from '../pages/auth/SignupLoginPage.ts';
import { SignupFormPage } from '../pages/auth/SignupFormPage.ts';
import { AccountCreatedPage } from '../pages/auth/AccountCreatedPage.ts';
import { testUser } from '../testData/users.ts';

test('Test Case 1: Register User @signup', async ({ page }) => {
  const homePage = new HomePage(page);
  const basePage = new BasePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const signupFormPage = new SignupFormPage(page);
  const accountCreatedPage = new AccountCreatedPage(page);
  const email = `email+${Date.now()}+@test.com`

  // Step 1: Go to Home Page
  await basePage.navigate();
  await basePage.acceptConsentIfPresent();

  // Step 2: Go to Signup/Login page
  await homePage.goToSignupLogin();

  // Step 3: Verify 'New User Signup!' is visible
  expect(await signupLoginPage.headerText.textContent()).toContain(
    'New User Signup!',
  );
  // Step 4: Enter Name and Email
  await signupLoginPage.newUserSignup('Jonas', email);

  // Step 5: Verify that 'ENTER ACCOUNT INFORMATION' is visible
  expect(await signupFormPage.headerTxt.textContent()).toContain(
    'Enter Account Information',
  );

  // Step 6: Fill full registration form
  await signupFormPage.completeRegistration(testUser);

  // Step 7: Verify that 'ACCOUNT CREATED!' is visible
  expect(await accountCreatedPage.accountCreatedTxt.innerText()).toContain(
    'ACCOUNT CREATED!',
  );
  await accountCreatedPage.clickContinue();

  // Step 8: Verify that 'Logged in as username' is visible
  await expect(homePage.loggedInAsTxt).toBeVisible();

  
  // Step 9: Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await homePage.deleteAccount();
  expect(await homePage.accDeletedTxt.textContent()).toContain(
    'Account Deleted!',
  );
});
