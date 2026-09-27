import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  pendingPhone: string | null;
  isAuthenticated: boolean;
  requestOtp: (phone: string) => void;
  verifyOtp: (code: string) => boolean;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  pendingPhone: null,
  isAuthenticated: false,
  requestOtp: (phone) => set({ pendingPhone: phone }),
  verifyOtp: (code) => {
    if (code.length !== 4) return false;
    const phone = get().pendingPhone ?? '';
    set({
      isAuthenticated: true,
      user: { id: 'u1', name: 'Alex Sharma', phone },
    });
    return true;
  },
  logout: () => set({ isAuthenticated: false, user: null, pendingPhone: null }),
  updateProfile: (patch) =>
    set((state) => ({ user: state.user ? { ...state.user, ...patch } : state.user })),
}));
