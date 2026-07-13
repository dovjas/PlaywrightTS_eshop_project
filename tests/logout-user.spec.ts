import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { SignupLoginPage } from '../pages/auth/SignupLoginPage.ts';
import { testUser } from '../testData/users.ts';

test.skip('Test Case 3: Logout User @logout', async ({ page }) => {
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
  await test.step('Step 5. Login using Email and Password ', async () => {
    await signupLoginPage.userLogin(
      testUser.validLoginUser.email,
      testUser.validLoginUser.password,
    );
  });
  await test.step('Step 6. Verify that "Logged in as username" is visible', async () => {
    await expect(homePage.loggedInAsTxt).toBeVisible();
    await expect(homePage.loggedInAsTxt).toContainText(
      testUser.validLoginUser.firstName,
    );
  });

  await test.step('Step 7. Logout user', async () => {
    await homePage.logoutBtn.click();
  });

  await test.step('Step 8. Verify that user is navigated to login page', async () => {
    expect(await signupLoginPage.loginHeaderTxt.textContent()).toContain(
      'Login to your account',
    );
  });
});
