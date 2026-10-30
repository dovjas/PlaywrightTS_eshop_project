import { test, expect } from '../../src/fixtures/apiFixture';

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
});
