import { test,expect} from '../../src/fixtures/apiFixture';


test.describe('Products API', () => {
  test('should return products list', async ({ productsApi}) => {

    const response =await productsApi.getProducts()
    expect(response.status()).toBe(200)
  });
});
