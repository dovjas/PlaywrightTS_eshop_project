import { test as setup, expect } from '../fixtures/pomFixtures.ts';
import { testUser } from '../testData/users.ts';

setup('Global - Signup auth', async ({ page, homePage, signupLoginPage }) => {
  await setup.step('Step 1: Navigate to Home Page', async () => {
    await homePage.navigate('/');
  });
  await setup.step(
    'Step 2: Verify that home page is visible successfully',
    async () => {
      await expect(page).toHaveURL(/automationexercise.com/);
      await expect(homePage.productCards.first()).toBeVisible();
    },
  );
  await setup.step('Step 3: Go to Signup/Login page', async () => {
    await homePage.goToSignupLogin();
  });
  await setup.step(
    'Step 4: Verify "Login to your account" is visible',
    async () => {
      await expect(signupLoginPage.loginHeaderTxt).toContainText(
        'Login to your account',
      );
    },
  );
  await setup.step('Step 5. Login using Email and Password ', async () => {
    await signupLoginPage.userLogin(
      testUser.validLoginUser.email,
      testUser.validLoginUser.password,
    );
  });
  await setup.step(
    'Step 6. Verify that "Logged in as username" is visible',
    async () => {
      await expect(homePage.loggedInAsTxt).toBeVisible();
      await expect(homePage.loggedInAsTxt).toContainText(
        testUser.validLoginUser.firstName,
      );
    },
  );

  await page.context().storageState({
    path: './playwright/.auth/auth.json',
  });
});
