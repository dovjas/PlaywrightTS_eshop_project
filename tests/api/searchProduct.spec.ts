import { test, expect } from '../../src/fixtures/apiFixture';
import { productData } from '../../test-data/api/product';

test.describe('Search product', () => {
  test('should return searched product', async ({ searchProductApi }) => {
    const search = await searchProductApi.searchProduct('Blue Top');

    expect(search.responseCode).toBe(200);
    expect(search.products).not.toHaveLength(0);

    const blueTop = search.products.find(
      (product) => product.name ===  productData.name,
    );
    expect(blueTop).toMatchObject({
      name: productData.name,
      brand: productData.brand,
    });
  });
});
