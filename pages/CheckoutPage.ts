import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  //locators
  page: Page;
  addressFullName: Locator;
  addressStreet: Locator;
  addressCityStatePostcode: Locator;
  addressCountry: Locator;
  addressPhone: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.addressFullName = page.locator(
      '#address_delivery .address_firstname',
    );
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
  }

  async getAddressData() {
    const address = {
      fullName: await this.addressFullName.innerText(),
      street: await this.addressStreet.innerText(),
      fullAddress:await this.addressCityStatePostcode.innerText(),
      country:await this.addressCountry.innerText(),
      phone:await this.addressPhone.innerText(),
    };
    console.log('Address: ', address);
  }
}
