import {Page, Locator} from '@playwright/test';

export class ProductsPage{
    page:Page;
    allProductsCards:Locator;
    searchInput:Locator;
    viewProductBtn:Locator;


    constructor(page:Page){
        this.page = page;
        this.allProductsCards = page.locator('.single-products');
        this.viewProductBtn = page.locator('.choose');
    }

    async goToProduct(){

    }
}