import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.request.get(endpoint);
    return response.json();
  }

  async post<T>(
    endpoint: string,
    data?: Record<string, string | number | boolean>,
  ): Promise<T> {
    const response = await this.request.post(endpoint, {
      form: data,
    });
    return response.json();
  }

  async put<T>(endpoint: string, data?: object): Promise<T> {
    const response = await this.request.put(endpoint, {
      data,
    });
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.request.delete(endpoint);
    return response.json();
  }
}
