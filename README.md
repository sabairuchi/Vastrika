# VASTRIKA — Luxury Ethnic Couture & Fashion Boutique

A modern, high-performance, and immersive luxury fashion boutique web application built with **React 19**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Lenis** smooth scrolling.

---

## 🌟 Brand & Overview

**VASTRIKA** is an exquisite, high-end fashion boutique designed to deliver a tailored, magazine-grade shopping experience. Specializing in royal ethnic wear—including **Lehengas**, **Sherwanis**, **Sarees**, **Kurta Sets**, and **Fine Accessories**—VASTRIKA combines artisanal craftsmanship with cutting-edge web design.

---

## 🛠️ Tech Stack

- **Frontend Core**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS tokens & typography
- **Animations & Transitions**: [Framer Motion](https://www.framer.com/motion/) & GSAP
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Linter & Code Quality**: [Oxlint](https://oxc.rs/)

---

## ✨ Key Features

1. **Artisanal Hero Showcase**:
   - Custom-built, full-screen auto-playing hero slider with 4.5s intervals, hover-pause, and dynamic background gradients synced to featured garments.
   - Live synchronization with `products.json` database.

2. **Curated Ethnic Collections**:
   - Seamless filtering across categories: *Lehengas*, *Sherwanis*, *Sarees*, *Kurta Sets*, and *Accessories*.
   - Dynamic video integrations using blend modes for an organic backdrop look.
   - Interactive `BounceCards` visual outfit gallery.

3. **Complete Shopping Experience**:
   - Slide-out Cart Drawer with instant quantity updates and persistent local storage.
   - Instant Buy & Full Checkout flow with standard or express shipping.
   - Frosted-glass (glassmorphism) order confirmation modal and dedicated confirmation page.

4. **Customer Concierge & Post-Purchase Hub**:
   - **Order Tracking**: Track real-time progress for orders with `VST-` IDs.
   - **Returns & Exchange**: Multi-step intuitive portal for returns and size exchanges.
   - **User Profile & Order History**: Saved addresses, profile management, and previous order lists.

5. **Editorial Design System**:
   - Fluid typography (`clamp()`), geometric serif headers, hairline borders, and responsive grid layouts from 375px mobile to 1440px+ ultra-wide.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Code Quality & Linting
```bash
npm run lint
```

---

## 📁 Project Structure

```
d:/Vastrika/
├── public/                 # Static assets, logos, and product media
├── src/
│   ├── assets/             # Branding assets and hero imagery
│   ├── components/
│   │   ├── cart/           # CartDrawer and cart widgets
│   │   ├── hero/           # Animated Hero slider sub-components
│   │   ├── layout/         # Navbar, Footer, PageShell, ScrollToTop
│   │   └── ui/             # Preloader, Logo, Reveal, Buttons, Cards
│   ├── context/            # CartContext and AuthContext state
│   ├── data/               # Products database and category definitions
│   ├── pages/              # Routes (Home, Shop, ProductDetail, Checkout, etc.)
│   ├── styles/             # Global CSS, tokens, and typography
│   └── utils/              # Price formatting and helper utilities
├── index.html              # HTML shell with VASTRIKA meta and branding
├── package.json            # Project configuration and dependencies
├── vercel.json             # Single Page Application (SPA) routing config
└── vite.config.js          # Vite bundler configuration
```

---

## 🚀 Deployment

The project is optimized for deployment on **Vercel** or any modern static hosting service:
- `vercel.json` is pre-configured with SPA rewrites (`/(.*) -> /index.html`).
- Run `npm run build` to generate the production-ready bundle in `dist/`.
