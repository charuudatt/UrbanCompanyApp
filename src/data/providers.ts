import { Provider } from '../types';

export const providers: Provider[] = [
  { id: 'p1', name: 'Ramesh Kumar', avatarColor: '#7C3AED', rating: 4.8, phone: '+91 98765 43210', vehicle: 'Bike - MH12 AB 1234' },
  { id: 'p2', name: 'Sunita Devi', avatarColor: '#E23744', rating: 4.9, phone: '+91 91234 56789', vehicle: 'Bike - DL8C XY 5678' },
  { id: 'p3', name: 'Arjun Singh', avatarColor: '#1FA971', rating: 4.7, phone: '+91 99887 66554', vehicle: 'Scooter - KA05 QR 4321' },
  { id: 'p4', name: 'Faisal Khan', avatarColor: '#0EA5E9', rating: 4.85, phone: '+91 90000 11122', vehicle: 'Bike - UP16 ZZ 9988' },
];

export const randomProvider = () => providers[Math.floor(Math.random() * providers.length)];
