import { SearchItemErrorRs, SearchItemRs } from '../../dto/item/itemIdRs';
import { SearchItemEntityRs } from '../../entities/item/searchItemRs';

export class SearchItemResponseMapper {
  public map(target: SearchItemRs | SearchItemErrorRs): SearchItemEntityRs | null {
    if ('error' in target) return null;
    return {
      autor: {
        name: 'Wilson Ramon',
        lastname: 'Martinez Barrera'
      },
      categories: [],
      item: {
        id: target.id,
        title: target.title,
        price: {
          currency: target.currency_id,
          amount: Math.trunc(target.price),
          decimals: `${target.price}`.includes('.') ? +`${target.price}`.split('.')[1] : 0
        },
        picture: target.thumbnail,
        condition: target.condition,
        freeShipping: target.shipping.free_shipping,
        soldQuantity: target.sold_quantity,
        description: ''
      }
    };
  }
}
