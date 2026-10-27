import { BaseApiClient } from '../../../src/api/base/BaseApiClient';
import { ProductsResponse } from '../../../src/types/api/products';
import { productResponseSchema } from '../../../src/schemas/api/product.schema';

export class ProductsApi {
  constructor(private readonly apiClient: BaseApiClient) {}

  async getProducts(): Promise<ProductsResponse> {
    const response =
      await this.apiClient.get<ProductsResponse>('/api/productsList');
    return productResponseSchema.parse(response);
  }
}
