import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FulfillmentType = 'express' | 'deep-clean' | 'pickup';

export interface CarOrder {
  id: string;
  client_name: string;
  phone: string;
  car_number: string;
  vehicle_model: string;
  items_json: ServiceItem[];
  fulfillment_type: FulfillmentType;
  status: string;
  created_at: string;
}

export interface CarSlotBooking {
  id: string;
  client_name: string;
  phone: string;
  vehicle_type: string;
  date: string;
  time: string;
  month: string;
  status: string;
  created_at: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}
