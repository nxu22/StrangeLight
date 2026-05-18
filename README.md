# Strange Light

A handmade lamp e-commerce shop. Browse one-of-a-kind lamps, add to cart, and checkout securely.

**Live site:** [strange-light-shop.vercel.app](https://strange-light-shop.vercel.app)

---

## How it works

1. **Browse** — View all available handmade lamps on the home page
2. **Add to cart** — Select items and adjust quantities
3. **Sign in** — Create an account or log in to proceed to checkout
4. **Checkout** — Enter shipping info and pay securely with a credit card
5. **Order saved** — Your order is recorded and payment is processed instantly

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Routing | React Router DOM |
| Styling | Tailwind CSS |
| Auth & Database | Supabase (PostgreSQL) |
| Payments | Stripe (PaymentIntents API) |
| Backend logic | Supabase Edge Functions (Deno) |
| Hosting | Vercel |

---

## Features

- User authentication (sign up / sign in)
- Shopping cart with quantity controls
- Protected checkout route
- Stripe payment integration with test mode
- Orders and order items saved to database
- Fully responsive design
