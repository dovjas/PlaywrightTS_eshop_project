import { BaseApiClient } from '../../../src/api/base/BaseApiClient';
import { ProductsResponse } from '../../../src/types/api/products';

export class ProductsApi {
  constructor(private readonly apiClient: BaseApiClient) {}

  async getProducts(): Promise<ProductsResponse> {
    return this.apiClient.get('/api/productsList');
  }
}
