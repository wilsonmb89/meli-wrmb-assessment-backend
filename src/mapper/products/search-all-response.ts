import { Filter, Result, SearchAllRs, SellerAddress } from '../../dto/products/searchAllRs';
import { SearchAllEntityRs, SearchAllResultItem } from '../../entities/products/searchAllRs';

export class SearchAllResponseMapper {

  private readonly MAX_ELEMENTS = 4;

  public map(target: SearchAllRs): SearchAllEntityRs {
    return {
      autor: {
        name: 'Wilson Ramon',
        lastname: 'Martinez Barrera'
      },
      categories: this.mapCategory(target.filters),
      items: this.mapItems(target.results)
    };
  }

  private mapCategory(filters: Filter[]): string[] {
    if (!filters) return [];
    const categoryFilter = filters.find(filter => filter.id === 'category');
    if (!categoryFilter || (categoryFilter && !categoryFilter.values)) return [];
    return categoryFilter.values.map(value => value.name);
  }

  private mapItems(items: Result[]): SearchAllResultItem[] {
    if (!items) return [];
    const itemsLength = items.length;
    const mappedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.trunc(item.price),
          decimals: `${item.price}`.includes('.') ? +`${item.price}`.split('.')[1] : 0
        },
        picture: item.thumbnail,
        condition: item.condition,
        freeShipping: item.shipping.free_shipping,
        location: this.getLocation(item.seller_address)
      }
    });
    return mappedItems.slice(0, itemsLength > this.MAX_ELEMENTS ? this.MAX_ELEMENTS : itemsLength);
  }

  private getLocation(sellerAddress: SellerAddress): string {
    if (!sellerAddress) return '';
    const countryName = sellerAddress.country && sellerAddress.country.name ? sellerAddress.country.name : '';
    const stateName = sellerAddress.state && sellerAddress.state.name ? sellerAddress.state.name : '';
    const cityName = sellerAddress.city && sellerAddress.city.name ? sellerAddress.city.name : '';
    return `${cityName ? cityName.concat(' - ') : ''}${stateName ? stateName.concat(' - ') : ''}${countryName || ''}`;
  }
}
