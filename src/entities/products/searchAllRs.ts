export interface SearchAllEntityRs {
  autor: {
    name: string;
    lastname: string;
  },
  categories: string[],
  items: SearchAllResultItem[];
}

export interface SearchAllResultItem {
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
  location: string;
}
