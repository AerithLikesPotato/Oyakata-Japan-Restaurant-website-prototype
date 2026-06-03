# 🍱 Oyakata Japanese Restaurant — Online Ordering Website

A fully static, multi-page website for **Oyakata Japanese Restaurant** with online menu browsing, a shopping cart, and checkout with card and Bakong QR payment support.

## 🗂 Project Structure

```
oyakata-site/
├── index.html          # Home page (hero, menu categories, about, reviews)
├── menu.html           # Full menu with category filter & cart
├── checkout.html       # Checkout (delivery info, card & Bakong QR payment)
├── confirmation.html   # Order confirmation page
├── contact.html        # Contact form & map
├── style.css           # All styles (global, nav, cart, checkout, alerts)
├── layout.js           # Shared nav, alert banner, and footer components
├── app.js              # Cart logic, localStorage, toast notifications
├── products.js         # Product catalogue data
└── images/             # All restaurant and food images
```

## ✨ Features

- **Responsive design** — works on mobile, tablet, and desktop
- **Shopping cart** — persisted in localStorage, accessible from any page
- **Checkout** — delivery or pickup, contact info, address, promo codes
- **Payment options** — Credit/Debit card (Visa, Mastercard, ABA, ACELEDA) and **Bakong KHQR**
- **Site alert banners** — dismissible, per-page alerts (promo, flash sale, secure checkout)
- **Page transitions** and scroll-reveal animations
- No backend required — fully static, ready for GitHub Pages

## 🚀 Live Demo (GitHub Pages)

> After deploying, your site will be at:  
> `https://<your-username>.github.io/<repo-name>/`

## 🛠 Local Development

No build tools needed. Just open any HTML file in a browser:

```bash
# Option 1: open directly
open index.html

# Option 2: use a local server (avoids CORS issues)
npx serve .
# or
python3 -m http.server 8080
```

## 📦 Deployment (GitHub Pages)

See the step-by-step guide below ↓

---

## 💳 Payment Methods

| Method | Provider | Notes |
|--------|----------|-------|
| Visa / Mastercard | Card payment | Simulated (frontend only) |
| ABA / ACELEDA | Card payment | Simulated (frontend only) |
| Bakong QR | National Bank of Cambodia · KHQR | Scan with any KHQR app |

> **Note:** This is a demo/portfolio project. No real payments are processed.

---

*© 2026 Oyakata Japanese Restaurant*
