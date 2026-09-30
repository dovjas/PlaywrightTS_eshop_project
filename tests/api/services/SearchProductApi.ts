import { BaseApiClient } from '../../../src/api/base/BaseApiClient';
import { ProductsResponse } from '../../../src/types/api/products';

export class SearchProductApi {
  constructor(private readonly apiClient: BaseApiClient) {}

  async searchProduct(searchTerm: string): Promise<ProductsResponse> {
    return this.apiClient.post<ProductsResponse>('/api/searchProduct', {
      search_product: searchTerm,
    });
  }
}
