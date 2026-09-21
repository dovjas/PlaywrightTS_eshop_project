import { test, expect } from '../../../src/fixtures/pomFixtures';
import { testUser } from '../../../test-data/users.ts';

test.describe('Login tests', () => {
  test.beforeEach(async ({ page, homePage }) => {
    await test.step('Navigate to Home Page', async () => {
      await homePage.navigate('/');
    });

    await test.step('Verify that Home Page is visible', async () => {
      await expect(page).toHaveURL(/automationexercise.com/);
      await expect(homePage.productCards.first()).toBeVisible();
    });

    await test.step('Go to Signup/Login page', async () => {
      await homePage.goToSignupLogin();
    });
  });

  test('Test Case 1: should login successfully using valid credentials @login', async ({
    homePage,
    signupLoginPage,
  }) => {
    await test.step('Verify "Login to your account" is visible', async () => {
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
    await test.step('Verify that user is logged in', async () => {
      await expect(homePage.loggedInAsTxt).toContainText(
        testUser.validLoginUser.firstName,
      );
    });

    await test.step('Logout user', async () => {
      await homePage.logoutBtn.click();
    });

    await test.step('Verify that user is navigated to login page', async () => {
      expect(await signupLoginPage.loginHeaderTxt.textContent()).toContain(
        'Login to your account',
      );
    });
  });

  test('Test Case 2: should display error for invalid credentials @loginFailed', async ({
    signupLoginPage,
  }) => {
    await test.step('Verify "Login to your account" is visible', async () => {
      await expect(signupLoginPage.loginHeaderTxt).toContainText(
        'Login to your account',
      );
    });
    await test.step('Login using invalid Email and Password ', async () => {
      await signupLoginPage.userLogin(
        testUser.invalidLoginUser.email,
        testUser.invalidLoginUser.password,
      );
    });
    await test.step('Verify login error message', async () => {
      await expect(signupLoginPage.invalidLoginErrMsg).toContainText(
        'Your email or password is incorrect!',
      );
    });
  });
});
