import { test, expect } from '../../src/fixtures/apiFixture';
import { loginResponseSchema } from '../../src/schemas/api/login.schema';

const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

if (!email || !password) {
  throw new Error(' EMAIL or PASSWORD must be defined');
}

test.describe('Login API test', () => {
  test('should login successfully with valid credentials', async ({
    loginApi,
  }) => {
    const response = await loginApi.login(email, password);
    loginResponseSchema.parse(response)
    expect(response.responseCode).toBe(200);
    expect(response.message).toBe('User exists!');
  });
  test('should reject login with invalid password', async ({ loginApi }) => {
    const response = await loginApi.login(email, 'invalidPw.123');
    expect(response.responseCode).toBe(404);
    expect(response.message).toBe('User not found!');
  });
});
