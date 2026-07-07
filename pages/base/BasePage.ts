import { Page, Locator } from '@playwright/test'

export abstract class BasePage{
    protected page:Page;
    readonly baseUrl:string;
    readonly consentBtn:Locator;

    constructor(page:Page){
        this.page = page;
        this.baseUrl = 'https://www.automationexercise.com/';
        this.consentBtn = page.getByRole('button',{name:"Consent"});
    }

    async navigate():Promise<void>{
        await this.page.goto(this.baseUrl);
        await this.acceptConsentIfPresent();
    }

    async acceptConsentIfPresent(){
        try{
            await this.consentBtn.click();
            console.log('Consent banner accepted successfully');
        }catch(err){
            console.log('Consent banner not present or already accepted');
        }
    }
}