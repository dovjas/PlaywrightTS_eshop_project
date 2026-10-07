import { BaseApiClient } from '../../../src/api/base/BaseApiClient';
import { ProductsResponse } from '../../../src/types/api/products';
import { productsResponseSchema } from '../../../src/schemas/api/product.schema';

export class SearchProductApi {
  constructor(private readonly apiClient: BaseApiClient) {}

  async searchProduct(searchTerm: string): Promise<ProductsResponse> {
    const response = await this.apiClient.post<ProductsResponse>(
      '/api/searchProduct',
      {
        search_product: searchTerm,
      },
    );
    return productsResponseSchema.parse(response);
  }
}
