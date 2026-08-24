import { test, expect } from '../fixtures/pomFixtures';
import { testUser } from '../testData/users.ts';

test('Test Case 3: Login User with correct email and password @loginInvalid', async ({
  page,homePage,signupLoginPage
}) => {
  await test.step('1. Navigate to Home Page', async () => {
    await homePage.navigate('/');
  });
  await test.step('2. Verify that home page is visible successfully', async () => {
    await expect(page).toHaveURL(/automationexercise.com/);
    await expect(homePage.productCards.first()).toBeVisible();
  });
  await test.step('Step 3. Go to Signup/Login page', async () => {
    await homePage.goToSignupLogin();
  });
  await test.step('Step 4. Verify "Login to your account" is visible', async () => {
    await expect(signupLoginPage.loginHeaderTxt).toContainText(
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
