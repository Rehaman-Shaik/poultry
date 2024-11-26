import { create } from 'zustand';
import { Purchase, Sale, Stock, User } from '../types';

interface State {
  currentUser: User | null;
  purchases: Purchase[];
  sales: Sale[];
  stock: Stock;
  setCurrentUser: (user: User | null) => void;
  addPurchase: (purchase: Purchase) => void;
  addSale: (sale: Sale) => void;
  updateStock: (type: 'purchase' | 'sale', data: Purchase | Sale) => void;
}

export const useStore = create<State>((set) => ({
  currentUser: null,
  purchases: [],
  sales: [],
  stock: {
    broiler: { birds: 0, weight: 0 },
    layer: { birds: 0 },
  },
  setCurrentUser: (user) => set({ currentUser: user }),
  addPurchase: (purchase) =>
    set((state) => ({
      purchases: [...state.purchases, purchase],
    })),
  addSale: (sale) =>
    set((state) => ({
      sales: [...state.sales, sale],
    })),
  updateStock: (type, data) =>
    set((state) => {
      const newStock = { ...state.stock };
      if (data.type === 'Broiler') {
        if (type === 'purchase') {
          newStock.broiler.birds += data.numberOfBirds;
          newStock.broiler.weight += data.weight || 0;
        } else {
          newStock.broiler.birds -= data.numberOfBirds;
          newStock.broiler.weight -= data.weight || 0;
        }
      } else {
        if (type === 'purchase') {
          newStock.layer.birds += data.numberOfBirds;
        } else {
          newStock.layer.birds -= data.numberOfBirds;
        }
      }
      return { stock: newStock };
    }),
}));