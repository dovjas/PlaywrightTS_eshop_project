import { BaseApiClient } from '../../../src/api/base/BaseApiClient';
import { APIResponse } from '@playwright/test';

export class ProductsApi {
  constructor(private readonly apiClient: BaseApiClient) {}

  async getProducts(): Promise<APIResponse> {
    return this.apiClient.get('/productsList');
  }
}
