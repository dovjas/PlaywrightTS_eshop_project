import { Locator, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class CheckoutPage extends BasePage {
  readonly addressFullName: Locator;
  readonly addressStreet: Locator;
  readonly addressCityStatePostcode: Locator;
  readonly addressCountry: Locator;
  readonly addressPhone: Locator;
  readonly placeOrderBtn: Locator;

  //constructor
  constructor(page: Page) {
    super(page);

    this.page = page;
    this.addressFullName = page.locator('#address_delivery .address_firstname');
    this.addressStreet = page
      .locator('#address_delivery li.address_address1.address_address2')
      .nth(1);
    this.addressCityStatePostcode = page.locator(
      '#address_delivery .address_city',
    );
    this.addressCountry = page.locator(
      '#address_delivery .address_country_name',
    );
    this.addressPhone = page.locator('#address_delivery .address_phone');
    this.placeOrderBtn = page.getByRole('link', { name: 'Place Order' });
  }

  async getAddressData():Promise<void> {
    const address = {
      fullName: await this.addressFullName.innerText(),
      street: await this.addressStreet.innerText(),
      fullAddress: await this.addressCityStatePostcode.innerText(),
      country: await this.addressCountry.innerText(),
      phone: await this.addressPhone.innerText(),
    };
    console.log('Address: ', address);
  }

  async placeOrder():Promise<void> {
    await this.placeOrderBtn.click();
  }
}
