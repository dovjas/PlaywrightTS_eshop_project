import { test, expect } from '../fixtures/pomFixtures';
import { testUser } from '../testData/users';
import { productData } from '../testData/product';

test('Test Case 7: Add Products in Cart @addToCart', async ({
  page,
  homePage,
  productsPage,
  cartPage,
}) => {
  await test.step('1. Navigate to Home Page', async () => {
    await homePage.navigate('/');
  });
  await test.step('2. Verify that home page is visible successfully', async () => {
    await expect(page).toHaveURL(/automationexercise.com/);
    await expect(homePage.productCards.first()).toBeVisible();
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
    await productsPage.searchProduct(productData.name);
  });
  await test.step('Step 7. Verify "SEARCHED PRODUCT" is visible', async () => {
    const result = (
      await productsPage.productSearchResult(productData.name)
    ).first();
    await expect(result).toBeVisible();
  });

  await test.step('Step 8.  Verify all the products related to search are visible', async () => {
    const results = await productsPage.productSearchResult(
      testUser.validLoginUser.productName,
    );
    const count = await results.count();
    await expect(count).toBeGreaterThan(0);
    console.log(`Found ${await count} products for ${productData.name}`);
  });
  await test.step('Step 9. Hover over first product and click "Add to cart"', async () => {
    await productsPage.addToCart();
  });
  await test.step('Step 10. Verify product is added to Cart"', async () => {
    await productsPage.viewCart();
  });

  await test.step('Step 11. Verify product price, quantity and total price"', async () => {
    const actual = await cartPage.getCartDetails();

    expect(actual.name).toContain(productData.name);
    expect(actual.category).toContain(productData.category);
    expect(actual.price).toContain(productData.price);
    expect(actual.quantity).toContain(productData.quantity);
    expect(actual.totalPrice).toContain(productData.totalPrice);
  });
});
