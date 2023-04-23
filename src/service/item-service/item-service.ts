import { Response } from 'express';
import { Inject } from 'typescript-ioc';

import { SearchItemResponseMapper } from '../../mapper/item';
import { SearchItemRs } from '../../dto/item/itemIdRs';
import { ItemIdDescription } from '../../dto/item/itemIdDescriptionRs';
import { ItemCategoriesRs } from '../../dto/item/itemCategoriesRs';

export class ItemService {

  private SEARCH_ITEM_URL = 'https://api.mercadolibre.com/items/';
  private SEARCH_CATEGORIES_URL = 'https://api.mercadolibre.com/categories/';

  /**
   * Mapper to transform DTO data result in Entity data
   */
  private searchItemResponseMapper: SearchItemResponseMapper;

  constructor(@Inject searchItemResponseMapper: SearchItemResponseMapper) {
    this.searchItemResponseMapper = searchItemResponseMapper;
  }

  /**
   * Search in the API a item, have a orchestration for a description query and another
   * if the result not have a category
   * @param itemId is the unique identifier from a item
   * @param expressResponse used to emit the response to caller 
   */
  public async searchItem(
    itemId: string,
    expressResponse: Response
  ): Promise<void> {

    /** Item search */
    const response = await fetch(this.SEARCH_ITEM_URL.concat(itemId));
    const data = await response.json() as SearchItemRs;
    const mappedResponse = this.searchItemResponseMapper.map(data);

    /** Item description search */
    const descResponse = await fetch(this.SEARCH_ITEM_URL.concat(itemId).concat('/description'));
    const descData = await descResponse.json() as ItemIdDescription;
    if (mappedResponse && mappedResponse.item) {
      mappedResponse.item.description = descData.plain_text || '';
    }

    /** Category search */
    const categoryId = data.category_id || '';
    if (categoryId) {
      const categoriesResponse = await fetch(this.SEARCH_CATEGORIES_URL.concat(categoryId));
      const categoriesData = await categoriesResponse.json() as ItemCategoriesRs;
      if (mappedResponse && categoriesData.path_from_root && categoriesData.path_from_root.length > 0) {
        mappedResponse.categories = categoriesData.path_from_root.map(category => category.name);
      }
    }

    expressResponse.setHeader('Content-Type', 'application/json');
    expressResponse.end(JSON.stringify(mappedResponse));
  }

}
