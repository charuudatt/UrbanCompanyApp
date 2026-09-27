import { create } from 'zustand';
import { Order, OrderLine, OrderStatus, PaymentMethod } from '../types';
import { randomProvider } from '../data/providers';

interface CreateOrderInput {
  lines: OrderLine[];
  addressId: string;
  slotDate: string;
  slotTime: string;
  paymentMethod: PaymentMethod;
  total: number;
}

interface OrdersState {
  orders: Order[];
  createOrder: (input: CreateOrderInput) => string;
  advanceStatus: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
  rateOrder: (orderId: string, rating: number, review: string) => void;
  getOrder: (orderId: string) => Order | undefined;
}

const STATUS_FLOW: OrderStatus[] = [
  'confirmed',
  'provider_assigned',
  'on_the_way',
  'in_progress',
  'completed',
];

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  createOrder: (input) => {
    const id = `UC${Date.now().toString().slice(-8)}`;
    const order: Order = {
      id,
      ...input,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ orders: [order, ...state.orders] }));
    return id;
  },
  advanceStatus: (orderId) =>
    set((state) => ({
      orders: state.orders.map((o) => {
        if (o.id !== orderId || o.status === 'completed' || o.status === 'cancelled') return o;
        const currentIndex = STATUS_FLOW.indexOf(o.status);
        const next = STATUS_FLOW[Math.min(currentIndex + 1, STATUS_FLOW.length - 1)];
        const providerId = next === 'provider_assigned' && !o.providerId ? randomProvider().id : o.providerId;
        return { ...o, status: next, providerId };
      }),
    })),
  cancelOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' } : o)),
    })),
  rateOrder: (orderId, rating, review) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, rating, review } : o)),
    })),
  getOrder: (orderId) => get().orders.find((o) => o.id === orderId),
}));

export const STATUS_LABELS: Record<OrderStatus, string> = {
  confirmed: 'Booking Confirmed',
  provider_assigned: 'Beauty Expert Assigned',
  on_the_way: 'On The Way',
  in_progress: 'Service In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export { STATUS_FLOW };
