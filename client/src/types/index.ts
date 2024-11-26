export type PoultryType = 'Broiler' | 'Layer';

export interface Purchase {
  id: string;
  date: Date;
  type: PoultryType;
  numberOfBirds: number;
  pricePerUnit: number;
  totalPrice: number;
  weight?: number; // Only for Broiler
}

export interface Sale {
  id: string;
  date: Date;
  customerName: string;
  address: string;
  mobileNumber: string;
  type: PoultryType;
  numberOfBirds: number;
  pricePerUnit: number;
  totalAmount: number;
  weight?: number; // Only for Broiler
}

export interface Stock {
  broiler: {
    birds: number;
    weight: number;
  };
  layer: {
    birds: number;
  };
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'driver';
}