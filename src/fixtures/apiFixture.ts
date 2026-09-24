import { test as baseTest,expect } from '@playwright/test';
import { BaseApiClient } from '../api/base/BaseApiClient';
import { ProductsApi } from '../../tests/api/services/ProductsApi';

type ApiFixture = {
  productsApi: ProductsApi;
};

export const test = baseTest.extend<ApiFixture>({
  productsApi: async ({ request }, use) => {
    const apiClient = new BaseApiClient(request);
    await use(new ProductsApi(apiClient));
  },
});

export { expect };
