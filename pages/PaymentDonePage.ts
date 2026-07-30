import {Page, Locator} from '@playwright/test'

export class PaymentDonePage {
    page:Page;
    successh2Msg:Locator;
    downloadInvoiceBtn:Locator;

    constructor(page:Page) {
        this.page = page;
        this.successh2Msg = page.locator('[data-qa="order-placed"]');
        this.downloadInvoiceBtn = page.locator('.check_out');
    }

    async getSuccessh2Msg(){
        return this.successh2Msg.innerText();
    }
}