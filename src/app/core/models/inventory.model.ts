export interface Inventory {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  location: string;
  lastUpdated: string;
}

export interface CreateInventoryRequest {
  productId: number;
  quantity: number;
  location: string;
}

export interface UpdateInventoryQuantityRequest {
  quantityChange: number;
  reason: string;
}
