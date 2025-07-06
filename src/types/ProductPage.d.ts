export interface Image {
  imageUrl: string;
  imageText: string;
}

export interface SKU {
  itemId: string;
  images: Image[];
  variations: string[];
  Color?: string[];
  Talla?: string[];
  sellers: {
    commertialOffer: {
      Price: number;
      ListPrice: number;
    };
  }[];
}

export interface Product {
  productId: string;
  productName: string;
  brand: string;
  productReference: string;
  items: SKU[];
}
