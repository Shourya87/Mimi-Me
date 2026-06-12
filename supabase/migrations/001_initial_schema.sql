-- =============================================================
-- Mini & Me — Initial Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- =============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. PROFILES (extends auth.users)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  phone       text,
  address     text,
  city        text,
  zip         text,
  country     text default 'United States',
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

comment on table public.profiles is 'Extended user profile data, one row per auth.users entry.';

-- Auto-create a blank profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at on profiles
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- 2. ORDERS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  order_number    text not null unique,
  user_id         uuid references auth.users(id) on delete set null,
  -- Contact
  email           text not null,
  -- Shipping
  first_name      text not null,
  last_name       text not null,
  address         text not null,
  city            text not null,
  zip             text not null,
  country         text not null default 'United States',
  -- Items stored as JSON array: [{productId, variantId?, name, price, quantity, image}]
  items           jsonb not null default '[]',
  -- Totals
  subtotal        numeric(10,2) not null default 0,
  shipping_cost   numeric(10,2) not null default 0,
  discount        numeric(10,2) not null default 0,
  total           numeric(10,2) not null default 0,
  -- Payment (demo — no real payment gateway)
  payment_method  text not null default 'card',
  -- Fulfillment
  status          text not null default 'confirmed'
                  check (status in ('confirmed', 'packed', 'shipped', 'delivered', 'cancelled')),
  tracking_url    text,
  notes           text,
  created_at      timestamptz default now() not null,
  updated_at      timestamptz default now() not null
);

comment on table public.orders is 'Customer orders. Items stored as JSONB snapshot.';
comment on column public.orders.items is 'Snapshot of cart items at time of purchase.';

create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists orders_order_number_idx on public.orders(order_number);
create index if not exists orders_created_at_idx on public.orders(created_at desc);

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- 3. NEWSLETTER SUBSCRIPTIONS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.newsletter_subs (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  subscribed_at timestamptz default now() not null,
  source      text default 'homepage'
);

comment on table public.newsletter_subs is 'Email newsletter subscribers.';

create index if not exists newsletter_subs_email_idx on public.newsletter_subs(email);

-- ─────────────────────────────────────────────────────────────
-- 4. CONTACT MESSAGES
-- ─────────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text not null,
  message     text not null,
  replied     boolean default false,
  created_at  timestamptz default now() not null
);

comment on table public.contact_messages is 'Messages submitted via the contact form.';

create index if not exists contact_messages_created_at_idx on public.contact_messages(created_at desc);

-- =============================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================

-- Enable RLS on all tables
alter table public.profiles         enable row level security;
alter table public.orders           enable row level security;
alter table public.newsletter_subs  enable row level security;
alter table public.contact_messages enable row level security;

-- ──────────────────────────
-- PROFILES policies
-- ──────────────────────────
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ──────────────────────────
-- ORDERS policies
-- ──────────────────────────
drop policy if exists "Users can view own orders" on public.orders;
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "Authenticated users can place orders" on public.orders;
create policy "Authenticated users can place orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- Guest orders (user_id is null) — allowed via service role only from server
-- The anon role cannot insert orders with null user_id unless you want guest checkout.
-- For guest checkout, enable this:
drop policy if exists "Anon can insert guest orders" on public.orders;
create policy "Anon can insert guest orders"
  on public.orders for insert
  with check (user_id is null);

-- ──────────────────────────
-- NEWSLETTER policies
-- ──────────────────────────
drop policy if exists "Anyone can subscribe to newsletter" on public.newsletter_subs;
create policy "Anyone can subscribe to newsletter"
  on public.newsletter_subs for insert
  with check (true);

-- ──────────────────────────
-- CONTACT MESSAGES policies
-- ──────────────────────────
drop policy if exists "Anyone can submit a contact message" on public.contact_messages;
create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  with check (true);
