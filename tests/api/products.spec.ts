import { test, expect } from '../../src/fixtures/apiFixture';
import { productData } from '../../test-data/api/product';

test.describe('Products API', () => {
  test('should return a non-empty products list', async ({ productsApi }) => {
    const products = await productsApi.getProducts();
    expect(products.responseCode).toBe(200);
    expect(products.products).not.toHaveLength(0);

    const firstProduct = products.products[0];
    expect(firstProduct).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
      }),
    );

    const blueTop = products.products.find(
      (product) => product.name === productData.name,
    );
    expect(blueTop).toMatchObject({
      name: productData.name,
      brand: productData.brand,
    });
  });
});
