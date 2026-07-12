import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { SignupLoginPage } from '../pages/auth/SignupLoginPage.ts';
import { SignupFormPage } from '../pages/auth/SignupFormPage.ts';
import { AccountCreatedPage } from '../pages/auth/AccountCreatedPage.ts';
import { testUser } from '../testData/users.ts';

test('Test Case 1: Register User @signup', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const signupFormPage = new SignupFormPage(page);
  const accountCreatedPage = new AccountCreatedPage(page);

  await test.step('1. Navigate to Home Page', async () => {
    await homePage.navigate('/');
  });

  await test.step('2. Verify that home page is visible successfully', async () => {
    await expect(page).toHaveURL(/automationexercise.com/);
    const count = await homePage.productCards.count();
    await expect(count).toBeGreaterThan(0);
  });

  await test.step('Step 3. Go to Signup/Login page', async () => {
    await homePage.goToSignupLogin();
  });

  await test.step('Step 4. Verify "New User Signup!" is visible', async () => {
    expect(await signupLoginPage.headerTxt.textContent()).toContain(
      'New User Signup!',
    );
  });

  await test.step('Step 5. Enter Name and Email', async () => {
    await signupLoginPage.newUserSignup(testUser.firstName, testUser.email);
  });

  await test.step('Step 6. Verify that "ENTER ACCOUNT INFORMATION" is visible', async () => {
    expect(await signupFormPage.headerTxt.textContent()).toContain(
      'Enter Account Information',
    );
  });

  await test.step('Step 7. Fill full registration form', async () => {
    await signupFormPage.completeRegistration(testUser);
  });

  await test.step('Step 8. Verify that "ACCOUNT CREATED!" is visible', async () => {
    expect(await accountCreatedPage.accountCreatedTxt.innerText()).toContain(
      'ACCOUNT CREATED!',
    );
    await accountCreatedPage.clickContinue();
  });

  await test.step('Step 9. Verify that "Logged in as username" is visible', async () => {
    await expect(homePage.loggedInAsTxt).toBeVisible();
    await expect(homePage.loggedInAsTxt).toContainText(testUser.firstName);
  });

  await test.step('Step 10. Verify that "ACCOUNT DELETED!" is visible and click "Continue" button', async () => {
    await homePage.deleteAccount();
    expect(await homePage.accDeletedTxt.textContent()).toContain(
      'Account Deleted!',
    );
  });
});
