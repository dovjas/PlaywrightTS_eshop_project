import { test, expect } from '../../src/fixtures/apiFixture';
import { loginResponseSchema } from '../../src/schemas/api/login.schema';

const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

if (!email || !password) {
  throw new Error(' EMAIL or PASSWORD must be defined');
}

test.describe('Login API test', () => {
  test(
    'should login successfully with valid credentials',
    { tag: ['@api', '@smoke'] },
    async ({ loginApi }) => {
      const response = await loginApi.login(email, password);
      loginResponseSchema.parse(response);
      expect(response.responseCode).toBe(200);
      expect(response.message).toBe('User exists!');
    },
  );
  test(
    'should reject login with invalid password',
    { tag: '@api' },
    async ({ loginApi }) => {
      const invalidPw = 'invalidPw.123';
      const response = await loginApi.login(email, invalidPw);
      expect(response.responseCode).toBe(404);
      expect(response.message).toBe('User not found!');
    },
  );
  test(
    'should reject login with empty email',
    { tag: '@api' },
    async ({ request }) => {
      const response = await request.post('/api/verifyLogin', {
        form: {
          email: '',
          password,
        },
      });
      const body = await response.json();
      expect(response.status()).toBe(200);
      loginResponseSchema.parse(body);
      expect(body).toEqual({
        responseCode: 404,
        message: 'User not found!',
      });
    },
  );
  test(
    'should reject login with empty password.',
    { tag: '@api' },
    async ({ request }) => {
      const response = await request.post('/api/verifyLogin', {
        form: {
          email: email,
          password: '',
        },
      });
      const body = await response.json();
      expect(response.status()).toBe(200);
      loginResponseSchema.parse(body);
      expect(body).toEqual({
        responseCode: 404,
        message: 'User not found!',
      });
    },
  );
});
