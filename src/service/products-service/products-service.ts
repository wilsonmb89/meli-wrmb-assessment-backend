import fetch from 'node-fetch';
import { Response } from 'express';
import { Inject } from 'typescript-ioc';

import { SearchAllResponseMapper } from '../../mapper/products';
import { Result, SearchAllRs } from '../../dto/products/searchAllRs';

export class ProductsService {

  private readonly SEARCH_ALL_URL = 'https://api.mercadolibre.com/sites/MLA/search?q=';
  private readonly SEARCH_CATEGORY_URL = 'https://api.mercadolibre.com/categories/';

  /**
   * Mapper to transform DTO data result in Entity data
   */
  private searchAllResponseMapper: SearchAllResponseMapper;

  constructor(@Inject searchAllResponseMapper: SearchAllResponseMapper) {
    this.searchAllResponseMapper = searchAllResponseMapper;
  }

  /**
   * Search in the API some list items, have a orchestration if the result not have a category
   * @param query string value used for fetch a product list in the API
   * @param expressResponse used to emit the response to caller 
   */
  public async searchAll(
    query = '',
    expressResponse: Response
  ): Promise<void> {

    /** Product list search */
    const response = await fetch(this.SEARCH_ALL_URL.concat(query));
    const data = await response.json() as SearchAllRs;
    const mappedResponse = this.searchAllResponseMapper.map(data);

    /** Category search */
    if (!mappedResponse.categories || (mappedResponse.categories && mappedResponse.categories.length === 0)) {
      const categoryFinded = await this.searchCategory(data.results);
      mappedResponse.categories = categoryFinded ? [categoryFinded] : [];
    }

    expressResponse.setHeader('Content-Type', 'application/json');
    expressResponse.end(JSON.stringify(mappedResponse));
  }

  /**
   * Get the most frecuent category in an array
   * @param arr categories array
   * @returns value with the most frecuent value in the array
   */
  private findMostFrequent(arr: string[]): string {
    let countMap: Map<string, number> = new Map<string, number>();
    let mostFrequent: string = arr[0];
    
    for (let i = 0; i < arr.length; i++) {
      let count: number = countMap.get(arr[i]) || 0;
      countMap.set(arr[i], count + 1);
      if (countMap.get(arr[i])! > countMap.get(mostFrequent)!) {
        mostFrequent = arr[i];
      }
    }
    
    return mostFrequent;
  }

  /**
   * Search the category from the results API call
   * @param results the results from te API call
   * @returns Category name most used in the query
   */
  private async searchCategory(results: Result[]): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        if (results && results.length > 0) {
          const categories = results.map(item => item.category_id);
          const frequentCategory = this.findMostFrequent(categories);
          const resCategory = await fetch(this.SEARCH_CATEGORY_URL.concat(frequentCategory));
          const data = await resCategory.json();
          resolve(data && data.name ? data.name : '');
        } else {
          resolve('');
        }
      } catch (error) {
        reject(error);
      }
    });
    
  }
}
