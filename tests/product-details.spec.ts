import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductDetail } from '../pages/ProductDetail';

test('Test Case 6: Verify All Products and product detail page @productDetails', async ({
  page,
}) => {
  const homePage = new HomePage(page);
  // const productDetail = new ProductDetail(page);

  await test.step('1. Navigate to Home Page', async () => {
    await homePage.navigate('/');
  });
  await test.step('2. Verify that home page is visible successfully', async () => {
    await expect(page).toHaveURL(/automationexercise.com/);
    const count = await homePage.productCards.count();
    await expect(count).toBeGreaterThan(0);
  });
  await test.step('3. Go to "Products" page', async () => {
    await homePage.goToProducts();
  });
  await test.step('4. Verify user is navigated to "ALL PRODUCTS" page successfully', async () => {
    await expect(page).toHaveURL(/automationexercise\.com\/products/);
  });
});
