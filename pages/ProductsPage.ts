import {Page, Locator} from '@playwright/test';

export class ProductsPage{
    page:Page;
    allProductsCards:Locator;


    constructor(page:Page){
        this.page = page;
        this.allProductsCards = page.locator('.single-products');
    }
}