-- =============================================================
-- Mini & Me — Add payment_ref to orders table
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- =============================================================

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_ref text;
