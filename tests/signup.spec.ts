import { test, expect } from '../fixtures/pomFixtures';
import { testUser } from '../testData/users.ts';

test('Test Case 1: Register User @signup', async ({
  page,
  homePage,
  signupLoginPage,
  signupFormPage,
  accountCreatedPage,
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

  await test.step('Step 4. Verify "New User Signup!" is visible', async () => {
    expect(await signupLoginPage.newUserHeaderTxt.textContent()).toContain(
      'New User Signup!',
    );
  });

  await test.step('Step 5. Enter Name and Email', async () => {
    await signupLoginPage.newUserSignup(
      testUser.newUser.firstName,
      testUser.newUser.email,
    );
  });

  await test.step('Step 6. Verify that "ENTER ACCOUNT INFORMATION" is visible', async () => {
    expect(await signupFormPage.headerTxt.textContent()).toContain(
      'Enter Account Information',
    );
  });

  await test.step('Step 7. Fill full registration form', async () => {
    await signupFormPage.completeRegistration(testUser.newUser);
  });

  await test.step('Step 8. Verify that "ACCOUNT CREATED!" is visible', async () => {
    await expect(accountCreatedPage.accountCreatedTxt).toContainText(
      'Account Created!',
    );
    await accountCreatedPage.clickContinue();
  });

  await test.step('Step 9. Verify that "Logged in as username" is visible', async () => {
    await expect(homePage.loggedInAsTxt).toBeVisible();
    await expect(homePage.loggedInAsTxt).toContainText(
      testUser.newUser.firstName,
    );
  });

  await test.step('Step 10. Verify that "ACCOUNT DELETED!" is visible and click "Continue" button', async () => {
    await homePage.deleteAccount();
    await expect(homePage.accDeletedTxt).toContainText(
      'Account Deleted!',
    );
  });
});
