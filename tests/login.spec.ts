import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/auth/SignupLoginPage';
import { testUser } from '../testData/users.ts';

test('Test Case 2: Login User with correct email and password @login', async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  await test.step('Step 1: Navigate to Home Page', async () => {
    await homePage.navigate('/');
  });
  await test.step('Step 2: Verify that home page is visible successfully', async () => {
    await expect(page).toHaveURL(/automationexercise.com/);
    await expect(homePage.productCards.first()).toBeVisible();
  });
  await test.step('Step 3: Go to Signup/Login page', async () => {
    await homePage.goToSignupLogin();
  });
  await test.step('Step 4: Verify "Login to your account" is visible', async () => {
    await expect(signupLoginPage.loginHeaderTxt).toContainText(
      'Login to your account',
    );
  });
  await test.step('Step 5. Login using Email and Password ', async () => {
    await signupLoginPage.userLogin(
      testUser.validLoginUser.email,
      testUser.validLoginUser.password,
    );
  });
  await test.step('Step 6. Verify that "Logged in as username" is visible', async () => {
    await expect(homePage.loggedInAsTxt).toBeVisible();
    await expect(homePage.loggedInAsTxt).toContainText(testUser.validLoginUser.firstName);
  });
});
