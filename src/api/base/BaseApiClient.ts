import { APIRequestContext, APIResponse } from '@playwright/test';

class BaseApiClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Helper wrapper for POST requests with integrated step logging.
   */
  async post(
    endpoint:string,
    
  )

}
