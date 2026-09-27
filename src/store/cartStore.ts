import { create } from 'zustand';
import { CartLine } from '../types';
import { getServiceById } from '../data/services';

interface CartState {
  lines: CartLine[];
  add: (serviceId: string) => void;
  remove: (serviceId: string) => void;
  setQty: (serviceId: string, qty: number) => void;
  clear: () => void;
  qtyOf: (serviceId: string) => number;
  totalCount: () => number;
  totalAmount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  lines: [],
  add: (serviceId) =>
    set((state) => {
      const existing = state.lines.find((l) => l.serviceId === serviceId);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.serviceId === serviceId ? { ...l, qty: l.qty + 1 } : l
          ),
        };
      }
      return { lines: [...state.lines, { serviceId, qty: 1 }] };
    }),
  remove: (serviceId) =>
    set((state) => {
      const existing = state.lines.find((l) => l.serviceId === serviceId);
      if (!existing) return state;
      if (existing.qty <= 1) {
        return { lines: state.lines.filter((l) => l.serviceId !== serviceId) };
      }
      return {
        lines: state.lines.map((l) =>
          l.serviceId === serviceId ? { ...l, qty: l.qty - 1 } : l
        ),
      };
    }),
  setQty: (serviceId, qty) =>
    set((state) => {
      if (qty <= 0) return { lines: state.lines.filter((l) => l.serviceId !== serviceId) };
      const existing = state.lines.find((l) => l.serviceId === serviceId);
      if (existing) {
        return { lines: state.lines.map((l) => (l.serviceId === serviceId ? { ...l, qty } : l)) };
      }
      return { lines: [...state.lines, { serviceId, qty }] };
    }),
  clear: () => set({ lines: [] }),
  qtyOf: (serviceId) => get().lines.find((l) => l.serviceId === serviceId)?.qty ?? 0,
  totalCount: () => get().lines.reduce((sum, l) => sum + l.qty, 0),
  totalAmount: () =>
    get().lines.reduce((sum, l) => {
      const service = getServiceById(l.serviceId);
      return sum + (service ? service.price * l.qty : 0);
    }, 0),
}));
