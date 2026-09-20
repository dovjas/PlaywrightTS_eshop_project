import { test, expect } from '../../../src/fixtures/pomFixtures';
import { testUser } from '../../../testData/users';

const contactFormData = {
  name: 'Janas',
  email: 'janas@test.lt',
  subject: 'Testing subject',
  message: 'This is a testing message',
};

test('Test Case 8: Contact Us Form @contactForm', async ({
  page,
  homePage,
  contactUsPage,
}) => {
  await test.step('Step 1. Navigate to Home Page', async () => {
    await homePage.navigate('/');
  });

  await test.step('Step 2. Verify that home page is visible successfully', async () => {
    await expect(page).toHaveURL(/automationexercise.com/);
    await expect(homePage.productCards.first()).toBeVisible();
  });

  await test.step('7. Click on "Contact Us" button', async () => {
    await homePage.goToContactUs();
  });

  await test.step('8. Verify "GET IN TOUCH" is visible', async () => {
    await expect(contactUsPage.getInTouchHeaderTxt).toBeVisible();
  });

  await test.step('9.  Enter name, email, subject and message', async () => {
    await contactUsPage.submitContactForm(contactFormData);
  });

  await test.step('Step 10: Accept alert', async () => {
    await contactUsPage.acceptAlert();
  });

  await test.step('Step 11: Verify success message', async () => {
    await expect(contactUsPage.submitSuccessTxt).toBeVisible();
  });
});
