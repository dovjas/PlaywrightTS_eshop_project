import { Page, Locator } from '@playwright/test'

export class BasePage{
    page:Page;
    baseUrl:string;
    consentBtn:Locator;
    //locators
    //constructor
    constructor(page:Page){
        this.page = page;
        this.baseUrl = 'https://www.automationexercise.com/';
        this.consentBtn = page.getByRole('button',{name:"Consent"});
    }
    //actions
    async navigate():Promise<void>{
        await this.page.goto(this.baseUrl);
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