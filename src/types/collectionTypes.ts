export interface Filter {
    id: string;
    title: string;
    value: string;
    valueName: string;
    currency: string | null;
    comparisonType: number;
  }
  
  export interface CollectionInfo {
    id: number;
    name: string;
    description: string;
    url: string;
    langCode: string;
  }
  
  export interface Product {
    productCode: string;
    colorCode: string | null;
    name: string;
    imageUrl: string;
  }
  
  export interface Collection {
    id: number;
    filters: {
      useOrLogic: boolean;
      filters: Filter[];
    } | null;
    type: number;
    info: CollectionInfo;
    salesChannelId: number;
    products: Product[] | null;
  }