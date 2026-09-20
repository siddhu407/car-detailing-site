import type { ServiceItem } from '@/lib/supabase';

export const SERVICES: ServiceItem[] = [
  {
    id: 'ceramic-coating',
    name: 'Ceramic Coating Pro',
    price: 7999,
    category: 'Paint Protection',
    image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
  },
  {
    id: 'exterior-wash',
    name: 'Express Exterior Wash',
    price: 399,
    category: 'Wash',
    image: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
  },
  {
    id: 'interior-detailing',
    name: 'Interior Deep Cleaning',
    price: 1499,
    category: 'Detailing',
    image: 'https://images.pexels.com/photos/4488636/pexels-photo-4488636.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
  },
  {
    id: 'full-detailing',
    name: 'Full Body Detailing',
    price: 2999,
    category: 'Detailing',
    image: 'https://images.pexels.com/photos/5879625/pexels-photo-5879625.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
  },
  {
    id: 'seat-covers',
    name: 'Custom Seat Covers',
    price: 2499,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/2100192/pexels-photo-2100192.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
  },
  {
    id: 'floor-mats',
    name: 'Premium Floor Mats',
    price: 1299,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/376361/pexels-photo-376361.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
  },
  {
    id: 'polish-wax',
    name: 'Polish & Wax Treatment',
    price: 999,
    category: 'Paint Protection',
    image: 'https://images.pexels.com/photos/667829/pexels-photo-667829.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
  },
  {
    id: 'headlight-restore',
    name: 'Headlight Restoration',
    price: 599,
    category: 'Restoration',
    image: 'https://images.pexels.com/photos/1409961/pexels-photo-1409961.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
  },
];

export const VEHICLE_TYPES = ['Hatchback', 'Sedan', 'SUV', 'Luxury / MPV', 'Bike'];

export const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '12:00 PM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM',
];

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function formatPrice(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}
