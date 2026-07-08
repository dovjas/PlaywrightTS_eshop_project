import { NewUserData } from '../pages/auth/SignupFormPage.ts';


export const testUser = {
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
} as NewUserData;