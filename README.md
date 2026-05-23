# Strange Light

**Strange Light** is a full-stack e-commerce web app for a fictional handmade lamp shop. Customers can browse one-of-a-kind lamps, search by animal motif, manage a shopping cart, sign in, and check out securely with a real Stripe payment flow.

**Live site:** [strange-light-shop.vercel.app](https://strange-light-shop.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + Vite |
| **Routing** | React Router DOM v7 |
| **Styling** | Tailwind CSS v4 |
| **Auth & Database** | Supabase (PostgreSQL) |
| **Payments** | Stripe (PaymentIntents API) |
| **Backend Logic** | Supabase Edge Functions (Deno runtime) |
| **Hosting** | Vercel |

---

## Features

- 🔐 **Auth** — Email sign up / sign in via Supabase Auth
- 🛒 **Shopping cart** — Persistent cart with quantity controls, managed via React Context
- 💳 **Stripe checkout** — PaymentIntent created server-side via a Supabase Edge Function, collected with Stripe Elements on the frontend
- 🗄️ **Order persistence** — Completed orders and line items saved to a Supabase PostgreSQL database
- 🎨 **Theme switcher** — 4 fully swappable color themes (Bratz, Cyber, Bubblegum, Alien) stored in `localStorage`
- ✨ **UI polish** — 3D tilt-on-hover hero logo, CSS swaying lamp animations, staggered rotations on the product grid
- 🔍 **Search** — Filter lamps by animal motif via URL search params
- 📱 **Fully responsive** layout

The entire frontend is built in **React with no component library** — all styles are hand-written with Tailwind and inline CSS, giving the shop a unique editorial / art-zine aesthetic.

---

## How it works

1. **Browse** — View all available handmade lamps on the home page
2. **Search** — Filter lamps by animal motif using the search bar
3. **Add to cart** — Select items and adjust quantities
4. **Sign in** — Create an account or log in to proceed to checkout
5. **Checkout** — Enter shipping info and pay securely with a credit card
6. **Order saved** — Your order is recorded in the database and payment is processed instantly
