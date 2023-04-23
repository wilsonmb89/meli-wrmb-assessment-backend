export interface SearchAllRs {
  site_id: string;
  country_default_time_zone: string;
  query: string;
  paging: Paging;
  results: Result[];
  sort: Sort;
  available_sorts: Sort[];
  filters: Filter[];
  available_filters: AvailableFilter[];
}

export interface AvailableFilter {
  id: string;
  name: string;
  type: string;
  values: AvailableFilterValue[];
}

export interface AvailableFilterValue {
  id: string;
  name: string;
  results: number;
}

export interface Sort {
  id: null | string;
  name: string;
}

export interface Filter {
  id: string;
  name: string;
  type: string;
  values: FilterValue[];
}

export interface FilterValue {
  id: string;
  name: string;
  path_from_root: Sort[];
}

export interface Paging {
  total: number;
  primary_results: number;
  offset: number;
  limit: number;
}

export interface Result {
  id: string;
  title: string;
  condition: string;
  thumbnail_id: string;
  catalog_product_id: null | string;
  listing_type_id: string;
  permalink: string;
  buying_mode: string;
  site_id: string;
  category_id: string;
  domain_id: string;
  thumbnail: string;
  currency_id: string;
  order_backend: number;
  price: number;
  original_price: number | null;
  sale_price: null;
  sold_quantity: number;
  available_quantity: number;
  official_store_id: number | null;
  use_thumbnail_id: boolean;
  accepts_mercadopago: boolean;
  tags: string[];
  shipping: Shipping;
  stop_time: Date;
  seller: Seller;
  seller_address: SellerAddress;
  address: Address;
  attributes: Attribute[];
  installments: Installments;
  winner_item_id: null;
  catalog_listing?: boolean;
  discounts: null;
  promotions: any[];
  inventory_id: null | string;
  official_store_name?: string;
  variation_filters?: string[];
  variations_data?: { [key: string]: VariationsDatum };
  differential_pricing?: DifferentialPricing;
}

export interface Address {
  state_id: string;
  state_name: string;
  city_id: null | string;
  city_name: string;
}

export interface Attribute {
  id: string;
  name: string;
  value_id: null | string;
  value_name: null | string;
  attribute_group_id: string;
  attribute_group_name: string;
  value_struct: Struct | null;
  values: AttributeValue[];
  source: number;
  value_type: string;
}

export interface Struct {
  number: number;
  unit: string;
}

export interface AttributeValue {
  id: null | string;
  name: null | string;
  struct: Struct | null;
  source: number;
}

export interface DifferentialPricing {
  id: number;
}

export interface Installments {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
}

export interface Seller {
  id: number;
  nickname: string;
  car_dealer: boolean;
  real_estate_agency: boolean;
  _: boolean;
  registration_date: Date;
  tags: string[];
  car_dealer_logo: string;
  permalink: string;
  seller_reputation: SellerReputation;
  eshop?: Eshop;
}

export interface Eshop {
  eshop_id: number;
  seller: number;
  nick_name: string;
  eshop_status_id: number;
  site_id: string;
  eshop_experience: number;
  eshop_rubro: null;
  eshop_locations: any[];
  eshop_logo_url: string;
}

export interface SellerReputation {
  level_id: string;
  power_seller_status: string;
  transactions: Transactions;
  metrics: Metrics;
}

export interface Metrics {
  sales: Sales;
  claims: Cancellations;
  delayed_handling_time: Cancellations;
  cancellations: Cancellations;
}

export interface Cancellations {
  period: string;
  rate: number;
  value: number;
  excluded?: Excluded;
}

export interface Excluded {
  real_value: number;
  real_rate: number;
}

export interface Sales {
  period: string;
  completed: number;
}

export interface Transactions {
  canceled: number;
  completed: number;
  period: string;
  ratings: Ratings;
  total: number;
}

export interface Ratings {
  negative: number;
  neutral: number;
  positive: number;
}

export interface SellerAddress {
  comment: string;
  address_line: string;
  zip_code: string;
  id: null;
  latitude: null;
  longitude: null;
  country: Sort;
  state: Sort;
  city: Sort;
}

export interface Shipping {
  store_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: string;
  mode: string;
  tags: string[];
  promise: null;
}

export interface VariationsDatum {
  thumbnail: string;
  ratio: string;
  name: string;
  pictures_qty: number;
  inventory_id?: string;
}
