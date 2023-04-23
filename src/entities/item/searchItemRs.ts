export interface SearchItemEntityRs {
  autor: {
    name: string;
    lastname: string;
  },
  categories: string[],
  item: SearchItemResultItem
}

export interface SearchItemResultItem {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  },
  picture: string;
  condition: string;
  freeShipping: boolean;
  soldQuantity: number;
  description: string;
}