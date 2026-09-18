# Elegance Wear | Luxury Fashion E-commerce

**Elegance Wear** is a premium, multi-page fashion e-commerce website designed to deliver a sophisticated luxury shopping experience. With a dark, gold-accented glassmorphism aesthetic and GSAP-driven motion design, the platform showcases curated collections for casual wear, bridal couture, luxury abayas, designer bags, footwear, and kids' fashion.

## ✨ Key Features

- **Luxury Dark Theme:** Deep noir palette, champagne-gold accents, glassmorphism cards, and cinematic glow orbs.
- **Hero Slider:** Auto-advancing crossfade hero with animated dots and an intro GSAP timeline.
- **Shop by Collection:** Six curated category landing pages, fully rendered dynamically from a central product data file.
- **Our Most Loved Styles:** Curated homepage product grid fed by the same data layer.
- **Product Cards:** Discount badges, color swatches, quick-view, and wishlist toggles on every card.
- **Interactive Product Modal:** Size/color selection, quantity stepper, and add-to-cart.
- **Shopping Cart:** Persistent localStorage cart with quantity controls, free-shipping logic, and an order summary.
- **Wishlist:** Persistent favorites with live badge count.
- **Promo & Countdown:** Copy-to-clipboard promo code (`ELEGANCE20`) with a live 24-hour countdown timer.
- **Perks Bar & Trust Badges:** Premium quality, trend-led drops, fast delivery, easy returns, secure payments.
- **Instagram Lookbook Gallery:** "Shop the Look" hover overlays driving traffic to collections.
- **GSAP ScrollTrigger:** Scroll-reveal animations across every section and page.
- **Premium Footer:** 5-column layout with newsletter signup, contact info, and social links.
- **Responsive:** Fully fluid from desktop to 320px mobile, with a slide-in mobile drawer menu.

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Animations:** GSAP (GreenSock Animation Platform) + ScrollTrigger
- **Imagery:** High-definition photography via the Unsplash CDN
- **Icons:** Inline SVG iconography for scalability and performance
- **Typography:** Cormorant Garamond (display) + Outfit (body)
- **Persistence:** Browser `localStorage` (cart & wishlist)

## 📂 Project Structure

```text
Dress website/
├── categories/            # Category landing pages (Casual, Bridal, Abaya, Bags, Shoes, Kids)
├── css/
│   └── style.css          # Complete design system (dark luxury + glassmorphism)
├── js/
│   ├── products.js        # Central product data (6 categories × 12 products)
│   └── script.js          # Core logic: animations, modals, cart, wishlist, reveals
├── About.html             # Brand story, stats & values
├── Contact.html           # Concierge contact form + boutique map
├── cart.html              # Shopping cart with order summary
├── index.html             # Home landing page
└── README.md              # Project documentation
```

## 🚀 Installation & Usage

This is a pure frontend project — no build step or dependencies required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/dress-website.git
   ```
2. **Open the project:**
   Simply open `index.html` in any modern web browser.

   **Recommended:** Run a local server for the best experience (avoids any file-protocol quirks):
   - **VS Code Live Server** (pre-configured at port `5502`), or
   - `npx serve .` from the project root.

## 🎨 Design System

- **Background:** `#040404` / `#0a0a0d` with layered radial gold glows.
- **Gold Palette:** `#D4AF37`, `#E8C96A`, `#F7E9B0` with gradient text for headings.
- **Surfaces:** `rgba(255,255,255,0.045)` glass panels with `backdrop-filter: blur()`.
- **Type:** Cormorant Garamond for display, Outfit for body, with wide letter-spacing.
- **Motion:** A luxe cubic-bezier easing curve and GSAP ScrollTrigger reveals.

## 👩‍💻 Developer

Developed with ❤️ by **Iqra Khan**.

---

© 2026 Elegance Wear. All Rights Reserved.
