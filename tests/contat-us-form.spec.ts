import { test, expect } from '@playwright/test';
import { ContactUsPage } from '../pages/ContactUsPage';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/auth/SignupLoginPage';
import { testUser } from '../testData/users';

const contactFormData = {
  name:'Janas',
  email:'janas@test.lt',
  subject:'Testing subject',
  message:'This is a testing message'
}


test('Test Case 5: Contact Us Form @contactForm', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const contactUsPage = new ContactUsPage(page);

  await test.step('Step 1. Navigate to Home Page', async () => {
    await homePage.navigate('/');
  });

  await test.step('Step 2. Verify that home page is visible successfully', async () => {
    await expect(page).toHaveURL(/automationexercise.com/);
    const count = await homePage.productCards.count();
    await expect(count).toBeGreaterThan(0);
  });

  await test.step('Step 3. Go to Signup/Login page', async () => {
    await homePage.goToSignupLogin();
  });

  await test.step('Step 4. Verify "Login to your account" is visible', async () => {
    expect(await signupLoginPage.loginHeaderTxt.textContent()).toContain(
      'Login to your account',
    );
  });

  await test.step('Step 5. Login using Email and Password ', async () => {
    await signupLoginPage.userLogin(
      testUser.validLoginUser.email,
      testUser.validLoginUser.password,
    );
  });

  await test.step('Step 6. Verify that "Logged in as username" is visible', async () => {
    await expect(homePage.loggedInAsTxt).toBeVisible();
    await expect(homePage.loggedInAsTxt).toContainText(
      testUser.validLoginUser.firstName,
    );
  });

  await test.step('7. Click on "Contact Us" button', async () => {
    await homePage.goToContactUs();
  });

  await test.step('8. Verify "GET IN TOUCH" is visible', async () => {
    await expect(contactUsPage.getInTouchHeaderTxt).toBeVisible();
  });

  await test.step('9.  Enter name, email, subject and message', async () => {
    await contactUsPage.submitContactForm(contactFormData.name,contactFormData.email,contactFormData.subject,contactFormData.message);
  });


});
