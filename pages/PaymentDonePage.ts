import {Page, Locator} from '@playwright/test'
import { BasePage } from './base/BasePage';

export class PaymentDonePage extends BasePage {
    readonly successh2Msg:Locator;
    readonly downloadInvoiceBtn:Locator;

    constructor(page:Page) {
        super(page);

        this.successh2Msg = page.locator('[data-qa="order-placed"]');
        this.downloadInvoiceBtn = page.locator('.check_out');
    }

    async getSuccessh2Msg():Promise<string>{
        return this.successh2Msg.innerText();
    }
}