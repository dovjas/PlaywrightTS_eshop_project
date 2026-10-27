import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApiClient {
  constructor(private readonly request: APIRequestContext) {}

  private async parseResponse<T>(response: APIResponse): Promise<T> {
    if (!response.ok()) {
      throw new Error(
        `API request failed with HTTP ${response.status()} ${response.statusText()} for ${response.url()}`,
      );
    }

    return (await response.json()) as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.request.get(endpoint);
    return this.parseResponse<T>(response);
  }

  async post<T>(
    endpoint: string,
    data?: Record<string, string | number | boolean>,
  ): Promise<T> {
    const response = await this.request.post(endpoint, {
      form: data,
    });
    return this.parseResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: object): Promise<T> {
    const response = await this.request.put(endpoint, {
      data,
    });
    return this.parseResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.request.delete(endpoint);
    return this.parseResponse<T>(response);
  }
}
