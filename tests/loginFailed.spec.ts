import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { SignupLoginPage } from '../pages/auth/SignupLoginPage.ts';
import { testUser } from '../testData/users.ts';

test('Test Case 2: Login User with correct email and password @loginInvalid', async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

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
  await test.step('Step 4. Verify "Login to your account" is visible', async () => {
    expect(await signupLoginPage.loginHeaderTxt.textContent()).toContain(
      'Login to your account',
    );
  });
  await test.step('Step 5. Login using invalid Email and Password ', async () => {
    await signupLoginPage.userLogin(
      testUser.invalidLoginUser.email,
      testUser.invalidLoginUser.password,
    );
  });
  await test.step('Step 6. Verify error message" is visible', async () => {
    await expect(signupLoginPage.invalidLoginErrMsg).toBeVisible();
    await expect(signupLoginPage.invalidLoginErrMsg).toContainText(
      'Your email or password is incorrect!',
    );
  });
});
