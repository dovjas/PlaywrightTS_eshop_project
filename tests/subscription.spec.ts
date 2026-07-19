import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { testUser } from '../testData/users.ts';

test('Test Case 8: Verify Subscription in home page @subscribe', async ({
  page,
}) => {
  const homePage = new HomePage(page);

  await test.step('Step 1: Navigate to Home Page', async () => {
    await homePage.navigate('/');
  });
  await test.step('Step 2: Verify that home page is visible successfully', async () => {
    await expect(page).toHaveURL(/automationexercise.com/);
    const count = await homePage.productCards.count();
    await expect(count).toBeGreaterThan(0);
  });
  await test.step('Step 3: Verify text "SUBSCRIPTION"', async () => {
    await expect(homePage.siubscriptionH2Txt).toBeVisible();
  });
  await test.step('Step 4: Submit subscription form', async () => {
    await homePage.subscribe(testUser.validLoginUser.email);
  });
  await test.step('Step 5:  Verify success message "You have been successfully subscribed!" is visible', async () => {
    expect(await homePage.subscriptionSuccessTxt).toBeVisible();
  });
});
