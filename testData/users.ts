import { NewUserData } from '../pages/auth/SignupFormPage.ts';

export const testUser = {
  validLoginUser: {
    email: 'email+1783927188631+@test.com',
    password: 'Labas11',
    firstName: 'Rimas',
  },
  newUser: {
    email: `email+${Date.now()}+@test.com`,
    title: 'Mr',
    password: 'Labas11',
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
