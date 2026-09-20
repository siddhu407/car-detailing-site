/*
# Create car detailing studio tables

1. New Tables
- `car_orders`: Stores customer orders for service packages.
  - id (uuid, primary key)
  - client_name (text, customer's full name)
  - phone (text, contact phone number)
  - car_number (text, vehicle registration number)
  - vehicle_model (text, car make/model)
  - items_json (jsonb, array of selected service packages)
  - fulfillment_type (text, one of: express, deep-clean, pickup)
  - status (text, default 'pending')
  - created_at (timestamptz, default now())
- `car_slot_bookings`: Stores slot reservations for car wash bookings.
  - id (uuid, primary key)
  - client_name (text, customer's full name)
  - phone (text, contact phone number)
  - vehicle_type (text, type of vehicle)
  - date (text, booking date)
  - time (text, booking time slot)
  - month (text, booking month)
  - status (text, default 'pending')
  - created_at (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- Allow anon + authenticated full CRUD — this is a single-tenant no-auth app where the
  browser submits bookings/orders directly. The owner dashboard is protected by a
  client-side password gate, not Supabase auth, so all reads come through the anon key.
*/

CREATE TABLE IF NOT EXISTS car_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  phone text NOT NULL,
  car_number text NOT NULL,
  vehicle_model text NOT NULL,
  items_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  fulfillment_type text NOT NULL DEFAULT 'express',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE car_orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_car_orders" ON car_orders;
CREATE POLICY "anon_select_car_orders" ON car_orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_car_orders" ON car_orders;
CREATE POLICY "anon_insert_car_orders" ON car_orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_car_orders" ON car_orders;
CREATE POLICY "anon_update_car_orders" ON car_orders FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_car_orders" ON car_orders;
CREATE POLICY "anon_delete_car_orders" ON car_orders FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS car_slot_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  phone text NOT NULL,
  vehicle_type text NOT NULL,
  date text NOT NULL,
  time text NOT NULL,
  month text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE car_slot_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_car_slot_bookings" ON car_slot_bookings;
CREATE POLICY "anon_select_car_slot_bookings" ON car_slot_bookings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_car_slot_bookings" ON car_slot_bookings;
CREATE POLICY "anon_insert_car_slot_bookings" ON car_slot_bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_car_slot_bookings" ON car_slot_bookings;
CREATE POLICY "anon_update_car_slot_bookings" ON car_slot_bookings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_car_slot_bookings" ON car_slot_bookings;
CREATE POLICY "anon_delete_car_slot_bookings" ON car_slot_bookings FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_car_orders_created_at ON car_orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_car_slot_bookings_created_at ON car_slot_bookings (created_at DESC);
