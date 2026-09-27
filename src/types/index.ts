export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  includes: string[];
  price: number;
  originalPrice?: number;
  durationMins: number;
  rating: number;
  ratingCount: number;
  image: string;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  line2: string;
  city: string;
  pincode: string;
}

export interface Provider {
  id: string;
  name: string;
  avatarColor: string;
  rating: number;
  phone: string;
  vehicle: string;
}

export interface CartLine {
  serviceId: string;
  qty: number;
}

export type OrderStatus =
  | 'confirmed'
  | 'provider_assigned'
  | 'on_the_way'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 'upi' | 'card' | 'cash' | 'wallet';

export interface OrderLine {
  serviceId: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  lines: OrderLine[];
  addressId: string;
  slotDate: string;
  slotTime: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  total: number;
  createdAt: string;
  providerId?: string;
  rating?: number;
  review?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
}
