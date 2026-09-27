import { create } from 'zustand';
import { Address } from '../types';

interface AddressState {
  addresses: Address[];
  selectedId: string | null;
  addAddress: (address: Omit<Address, 'id'>) => string;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
}

export const useAddressStore = create<AddressState>((set, get) => ({
  addresses: [
    {
      id: 'a1',
      label: 'Home',
      line1: '402, Palm Residency',
      line2: 'Baner Road',
      city: 'Pune',
      pincode: '411045',
    },
    {
      id: 'a2',
      label: 'Work',
      line1: '3rd Floor, Tech Park One',
      line2: 'Yerwada',
      city: 'Pune',
      pincode: '411006',
    },
  ],
  selectedId: 'a1',
  addAddress: (address) => {
    const id = `a${Date.now()}`;
    set((state) => ({ addresses: [...state.addresses, { ...address, id }], selectedId: id }));
    return id;
  },
  removeAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((a) => a.id !== id),
      selectedId: state.selectedId === id ? state.addresses[0]?.id ?? null : state.selectedId,
    })),
  selectAddress: (id) => set({ selectedId: id }),
}));
