import { test, expect } from '../../src/fixtures/apiFixture';

const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

if (!email || !password) {
  throw new Error(' EMAIL or PASSWORD must be defined');
}

test.describe('Login API test', () => {
  test('Successful login api test', async ({ loginApi }) => {
    const response = await loginApi.login(email, password);
    expect(response.responseCode).toBe(200);
    expect(response.message).toBe('User exists!');
  });
});
