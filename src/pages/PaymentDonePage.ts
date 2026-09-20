import {Page, Locator} from '@playwright/test'
import { BasePage } from './base/BasePage';
import { StepLogger } from '../utils/stepLogger';


export class PaymentDonePage extends BasePage {
    readonly successh2Msg:Locator;
    readonly downloadInvoiceBtn:Locator;

    constructor(page:Page) {
        super(page);

        this.successh2Msg = page.locator('[data-qa="order-placed"]');
        this.downloadInvoiceBtn = page.locator('.check_out');
    }

    async getSuccessh2Msg():Promise<string>{
    return await StepLogger.step('Fetch order placement success message', async () => {
        return this.successh2Msg.innerText();
    })}
}