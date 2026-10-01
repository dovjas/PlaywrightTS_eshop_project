import { BaseApiClient } from '../../../src/api/base/BaseApiClient';
import { LoginResponse } from '../../../src/types/api/login';

const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

export class LoginApi {
  constructor(private readonly apiClient: BaseApiClient) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    return this.apiClient.post<LoginResponse>('/api/verifyLogin', {
      email,
      password,
    });
  }
}
