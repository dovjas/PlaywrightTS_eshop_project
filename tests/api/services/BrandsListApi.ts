import { BaseApiClient } from '../../../src/api/base/BaseApiClient';
import { BrandsListResponse } from '../../../src/types/api/brands';
import { brandsListSchema } from '../../../src/schemas/api/brand.schema';

export class BrandsListApi{
    constructor(private readonly apiClient:BaseApiClient ) {}

    async getBrands(){
        const response = await this.apiClient.get<BrandsListResponse>('/api/brandsList');
        return brandsListSchema.parse(response)
    }
}