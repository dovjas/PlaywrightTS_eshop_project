import { any } from 'zod';
import { test, expect } from '../../src/fixtures/apiFixture';


test('Verify brands list', async({brandsListApi})=>{
    const response = await brandsListApi.getBrands();
    expect(response.responseCode).toBe(200);
    expect(response.brands.length).toBeGreaterThan(0);

    for(const brand of response.brands){
        expect(brand.id).toEqual(expect.any(Number))
        expect(brand.brand).toEqual(expect.any(String));
    }
})

