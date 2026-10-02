import { BaseApiClient } from '../../../src/api/base/BaseApiClient';
import { LoginResponse } from '../../../src/types/api/login';
import { loginResponseSchema } from '../../../src/schemas/api/login.schema';


export class LoginApi {
  constructor(private readonly apiClient: BaseApiClient) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.apiClient.post<LoginResponse>('/api/verifyLogin', {
      email,
      password,
    });
    return loginResponseSchema.parse(response)
  }
}
