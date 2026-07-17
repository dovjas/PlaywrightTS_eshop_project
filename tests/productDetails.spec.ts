import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetail } from '../pages/ProductDetail';

test('Test Case 6: Verify All Products and product detail page @productDetails', async ({
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
  await test.step('Step 6. Click on "View Product" of first product', async () => {
    await productsPage.viewProductBtn.first().click();
  });
  await test.step('Step 7. User is landed to product detail page', async () => {
    await expect(page).toHaveURL(/automationexercise\.com\/product_details/);
  });
  await test.step('Step 8. Verify that product details are visible: product name, category, price, availability, condition, brand', async () => {
    await expect(productDetail.getProductName()).toBeVisible();
    await expect(productDetail.getPorductCategory()).toBeVisible();
    await expect(productDetail.getProductPrice()).toBeVisible();
    await expect(productDetail.getproductAvailability()).toBeVisible();
    await expect(productDetail.getProductCondition()).toBeVisible();
    await expect(productDetail.getProductBrand()).toBeVisible();
  });
});
