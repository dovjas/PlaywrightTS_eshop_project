import { BrandsListApi } from "./services/BrandsListApi";
import { test, expect } from '../../src/fixtures/apiFixture';


test('Verify brands list', async({brandsListApi})=>{
    const response = await brandsListApi.getBrands()
    console.log('Brands lis resp', response)
})

