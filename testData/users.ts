import { NewUserData } from '../pages/auth/SignupFormPage.ts';


export const testUser = {
  validLoginUser: {
    email: process.env.TEST_USER_EMAIL!,
    password: process.env.TEST_USER_PASSWORD!,
    firstName: 'Rimas',
  },
  invalidLoginUser: {
    email: 'fail@invaliduser.com',
    password: 'invalid',
  },
  newUser: {
    email: `email+${Date.now()}+@test.com`,
    title: 'Mr',
    password: process.env.TEST_USER_PASSWORD!,
    dobDay: '9',
    dobMonth: 'April',
    dobYear: '1990',
    firstName: 'Rimas',
    lastName: 'Grimas',
    address: 'Lakunu street',
    country: 'India',
    state: 'Kataran',
    city: 'Deli',
    zipCode: '1441',
    mobileNumber: '0420012889',
  } as NewUserData,
};
