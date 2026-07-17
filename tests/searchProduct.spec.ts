import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetail } from '../pages/ProductDetail';


test('Test Case 6: Search Product @searchProduct', async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const productDetail = new ProductDetail(page);

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
  await test.step('Step 5. The products list is visible', async () => {
    await expect(productsPage.allProductsCards.first()).toBeVisible();
  });
    await test.step('Step 6. Enter product name in click search button', async () => {
        await productsPage.searchProduct('Blue Top');
    });
       await test.step('Step 7. Verify "SEARCHED PRODUCT" is visible', async () => {
        await productsPage.productSearchResult('Blue Top');
    });
})
