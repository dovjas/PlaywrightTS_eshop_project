import { test as baseTest, expect } from '@playwright/test';
import { BaseApiClient } from '../api/base/BaseApiClient';
import { ProductsApi } from '../../tests/api/services/ProductsApi';
import { SearchProductApi } from '../../tests/api/services/SearchProductApi';
import { LoginApi } from '../../tests/api/services/LoginApi';

type ApiFixture = {
  productsApi: ProductsApi;
  searchProductApi: SearchProductApi;
  loginApi: LoginApi;
};

export const test = baseTest.extend<ApiFixture>({
  productsApi: async ({ request }, use) => {
    const apiClient = new BaseApiClient(request);
    await use(new ProductsApi(apiClient));
  },

  searchProductApi: async ({ request }, use) => {
    const apiClient = new BaseApiClient(request);
    await use(new SearchProductApi(apiClient));
  },

  loginApi: async ({ request }, use) => {
    const apiClient = new BaseApiClient(request);
    await use(new LoginApi(apiClient));
  },
});

export { expect };
