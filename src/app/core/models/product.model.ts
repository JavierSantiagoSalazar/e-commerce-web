export interface Product {
  id: string | number;
  productName: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  imageUrl: string;
  inventory?: {
    id: number;
    quantity: number;
    location: string;
    lastUpdated: string;
  };
}
