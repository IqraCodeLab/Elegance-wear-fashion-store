// Elegance Wear — Core Logic & Premium Interactions

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateWishlistCount();

    const nav = document.querySelector('nav');

    // Navbar shrink on scroll
    const onScroll = () => {
        if (!nav) return;
        nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hero intro — cinematic reveal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.gsap) {
        const chars = heroTitle.querySelectorAll('.split-char');
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.from('.announce-bar', { y: -30, opacity: 0, duration: 0.6 }, 0)
            .from('.hero-badge', { y: 24, opacity: 0, duration: 0.9 }, 0.15)
            .from('.split-word', { y: '115%', opacity: 0, duration: 1.15, stagger: 0.14 }, 0.3)
            .from(heroTitle, { opacity: 0, duration: 0.4 }, 0.3)
            .from('.hero-sub', { y: 26, opacity: 0, duration: 0.9 }, 0.95)
            .from('.hero-cta .btn', { y: 22, opacity: 0, duration: 0.8, stagger: 0.15 }, 1.15);

        if (chars.length) {
            tl.from(chars, { scale: 1.35, opacity: 0, duration: 0.6, stagger: 0.035 }, 0.55);
        }
    }

    // Scroll reveal — GSAP ScrollTrigger with IntersectionObserver fallback
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        window.revealObserver = observer;
    }
    initReveals();

    // Mobile menu — drawer
    const hamburger = document.querySelector('.hamburger');
    const navLinksRow = document.querySelector('.nav-links-row');
    const navLinks = document.querySelector('.nav-links');
    const drawerClose = document.querySelector('.drawer-close');

    if (hamburger && navLinksRow) {
        const closeMenu = () => {
            navLinksRow.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
            document.body.style.overflow = '';
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = navLinksRow.classList.toggle('active');
            if (navLinks) navLinks.classList.toggle('active', open);
            hamburger.classList.toggle('active', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });

        if (drawerClose) drawerClose.addEventListener('click', closeMenu);

        if (navLinks) {
            navLinks.addEventListener('click', (e) => {
                if (e.target.closest('.dropdown > a')) {
                    e.preventDefault();
                    e.target.closest('.dropdown').classList.toggle('open');
                    return;
                }
                if (e.target.closest('a')) closeMenu();
            });
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-links') && !e.target.closest('.hamburger')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) closeMenu();
        });
    }

    // Hero carousel
    const carousel = document.getElementById('hero-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.hero-slide');
        const dotsWrap = document.getElementById('hero-dots');
        const prevBtn = carousel.parentElement.querySelector('.hero-arrow--prev');
        const nextBtn = carousel.parentElement.querySelector('.hero-arrow--next');
        let current = 0;
        let interval = null;

        if (slides.length > 1) {
            dotsWrap.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(dot);
            });
        }

        function goTo(i) {
            if (!slides.length) return;
            current = (i + slides.length) % slides.length;
            slides.forEach((s, idx) => s.classList.toggle('active', idx === current));
            dotsWrap.querySelectorAll('.hero-dot').forEach((d, idx) => d.classList.toggle('active', idx === current));
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }
        function start() {
            if (slides.length > 1 && !interval) interval = setInterval(next, 6000);
        }
        function stop() {
            if (interval) { clearInterval(interval); interval = null; }
        }

        if (prevBtn) prevBtn.addEventListener('click', () => { stop(); prev(); start(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { stop(); next(); start(); });
        carousel.addEventListener('mouseenter', stop);
        carousel.addEventListener('mouseleave', start);
        start();
    }

    // Mobile search toggle
    const searchToggle = document.querySelector('.search-toggle');
    const mobileSearch = document.getElementById('mobile-search');
    if (searchToggle && mobileSearch) {
        const mobileInput = mobileSearch.querySelector('input');
        const openSearch = () => {
            mobileSearch.classList.add('open');
            if (mobileInput) mobileInput.focus();
        };
        const closeSearch = () => {
            mobileSearch.classList.remove('open');
            if (mobileInput) mobileInput.value = '';
        };

        searchToggle.addEventListener('click', openSearch);
        mobileSearch.querySelector('.ms-close').addEventListener('click', closeSearch);
        if (mobileInput) {
            mobileInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    showToast(`Searching for: ${mobileInput.value}`);
                    closeSearch();
                }
            });
        }
    }

    // Search interactivity
    const searchInput = document.querySelector('.nav-search input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                showToast(`Searching for: ${searchInput.value}`);
                searchInput.value = '';
            }
        });
    }

    // Wishlist nav toggle feedback
    document.querySelectorAll('.wishlist-icon').forEach(btn => {
        btn.addEventListener('click', () => {
            const liked = btn.classList.toggle('liked');
            btn.style.color = liked ? '#ff4d4d' : '';
            showToast(liked ? 'Added to favorites!' : 'Removed from favorites');
        });
    });

    // Account button
    const accountBtn = document.querySelector('.account-btn');
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            showToast('My Account — Sign in & wishlists coming soon!');
        });
    }

    // Modal
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // Render dynamic grids
    const productGrid = document.getElementById('product-grid');
    if (productGrid && productGrid.dataset.category) {
        renderProducts(productGrid.dataset.category);
    }
    renderHomeProducts();
    renderNewArrivals();

    // New arrivals horizontal scroll
    const naTrack = document.getElementById('new-arrivals-track');
    const naPrev = document.querySelector('.na-btn--prev');
    const naNext = document.querySelector('.na-btn--next');
    if (naTrack && naPrev && naNext) {
        naPrev.addEventListener('click', () => naTrack.scrollBy({ left: -290, behavior: 'smooth' }));
        naNext.addEventListener('click', () => naTrack.scrollBy({ left: 290, behavior: 'smooth' }));
    }

    // Promo code copy-to-clipboard
    const promo = document.getElementById('promo-code');
    if (promo) {
        promo.addEventListener('click', () => {
            const range = document.createRange();
            range.selectNodeContents(promo);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            try { document.execCommand('copy'); } catch (e) { /* clipboard unavailable */ }
            sel.removeAllRanges();
            showToast('Code ELEGANCE20 copied to clipboard!');
        });
    }

    // Newsletter form
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Welcome to the Inner Circle. Thank you for subscribing!');
            form.reset();
        });
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            if (name) {
                showToast(`Thank you, ${name}! Your message has been sent.`);
                contactForm.reset();
            }
        });
    }
});

// ---------------- Scroll Reveals ----------------
function initReveals() {
    const revealEls = document.querySelectorAll('.reveal:not([data-animated])');

    if (window.gsap && window.ScrollTrigger) {
        revealEls.forEach(el => {
            el.dataset.animated = '1';
            const delay = (Number(el.dataset.delay) || 0) * 0.1;
            gsap.fromTo(el,
                { opacity: 0, y: 48 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay,
                    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
                }
            );
        });
    } else if (window.revealObserver) {
        revealEls.forEach(el => {
            el.dataset.animated = '1';
            window.revealObserver.observe(el);
        });
    }
}

// ---------------- Cart ----------------
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('elegance_cart')) || [];
    const el = document.getElementById('cart-count');
    if (el) el.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// ---------------- Wishlist ----------------
function toggleWishlist(productId, btn) {
    let wishlist = JSON.parse(localStorage.getItem('elegance_wishlist')) || [];
    const index = wishlist.indexOf(productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        btn.classList.remove('liked');
        showToast('Removed from wishlist');
    } else {
        wishlist.push(productId);
        btn.classList.add('liked');
        showToast('Added to wishlist!');
    }

    localStorage.setItem('elegance_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('elegance_wishlist')) || [];
    const el = document.getElementById('wishlist-count');
    if (el) el.innerText = wishlist.length;

    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const id = btn.dataset.id;
        btn.classList.toggle('liked', wishlist.includes(id));
    });
}

// ---------------- Product Rendering ----------------
let currentProduct = null;

// Local high-res fallbacks (used if any product image fails to load)
const IMG_FALLBACK = {
    Bridal: 'Images/Bridle/22-12.jpg',
    Casual: 'Images/Casual Dresses/turbolight-winter-dress-designs-2025-new-arrivals-dhanak-collection-khaddar-velvet-online-end-year-sale-dhanak-dress-design_3927b6e53690d238b3857a4f8995d6fd.jpg',
    Abaya: 'Images/Abbaya/11_Websize_1.jpg',
    Bags: 'Images/bag/71q39btMbyL._AC_SX679_.jpg',
    Shoes: 'Images/Shoes/71-n2HJ73aL._AC_UF1000,1000_QL80_.jpg',
    Kids: 'Images/kids/998034c77d14d98d000891b84f656525.jpg'
};

// Single path prefixer — handles root pages vs ../categories/ and survives
// when products.js is not loaded (e.g. cart.html). IMG lives in products.js;
// this helper falls back to a local prefix function when it is absent.
const IMG_PREFIX = (p) => (location.pathname.includes('/categories/') ? '../' : '') + p;
const imgPath = (p) => (typeof IMG === 'function' ? IMG(p) : IMG_PREFIX(p));

function imgFallback(img) {
    img.onerror = null;
    const key = (img.dataset.category || '').toLowerCase();
    const match = Object.keys(IMG_FALLBACK).find(k => k.toLowerCase() === key);
    img.src = imgPath(IMG_FALLBACK[match] || 'Images/categories/dresses.jpg');
    img.classList.add('img-failed');
}

function formatPrice(amount) {
    return `Rs.${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function productCard(product, wishlist, i) {
    const discountedPrice = product.discount > 0 ? (product.price * (1 - product.discount / 100)) : product.price;
    const isLiked = wishlist.includes(product.id);
    const safe = JSON.stringify(product).replace(/"/g, '&quot;');
    const swatches = product.colors.slice(0, 4)
        .map(c => `<span class="swatch-dot" style="background: ${c};" aria-hidden="true"></span>`)
        .join('');

    return `
        <div class="product-card reveal" data-delay="${(i % 4)}">
            <div class="product-img">
                <button class="wishlist-btn ${isLiked ? 'liked' : ''}"
                        data-id="${product.id}"
                        onclick="toggleWishlist('${product.id}', this); event.stopPropagation();"
                        aria-label="Add to wishlist">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <button class="cart-add-btn" onclick="quickAdd(${safe}); event.stopPropagation();" aria-label="Add to cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </button>
                <img loading="lazy" src="${imgPath(product.image)}" alt="${product.name}" data-category="${product.category}" onerror="imgFallback(this)">
                ${product.discount > 0 ? `<div class="discount-badge">-${product.discount}%</div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="product-cat">${product.category} · New Edit</span>
                <div class="card-swatches">${swatches}</div>
                ${ratingStars(product.id)}
                <div class="price-container">
                    ${product.discount > 0 ? `<span class="price original">${formatPrice(product.price)}</span>` : ''}
                    <span class="price">${formatPrice(discountedPrice)}</span>
                    ${product.discount > 0 ? `<span class="price-off">Save ${product.discount}%</span>` : ''}
                </div>
                <button class="btn btn-gold" onclick="openProductModal(${safe})">Quick View</button>
            </div>
        </div>
    `;
}

function renderProducts(category) {
    const grid = document.getElementById('product-grid');
    if (!grid || !window.productsData || !productsData[category]) return;

    const wishlist = JSON.parse(localStorage.getItem('elegance_wishlist')) || [];
    grid.innerHTML = productsData[category].map((p, i) => productCard(p, wishlist, i)).join('');
    initReveals();
}

function renderHomeProducts(count = 8) {
    const grid = document.getElementById('home-products');
    if (!grid || !window.productsData) return;

    const picks = [
        productsData.casual[0],
        productsData.casual[1],
        productsData.casual[3],
        productsData.casual[4],
        productsData.casual[7],
        productsData.bridal[2],
        productsData.abaya[1],
        productsData.bags[0]
    ].filter(Boolean);

    const wishlist = JSON.parse(localStorage.getItem('elegance_wishlist')) || [];
    grid.innerHTML = picks.slice(0, count).map((p, i) => productCard(p, wishlist, i)).join('');
    initReveals();
}

function renderNewArrivals() {
    const track = document.getElementById('new-arrivals-track');
    if (!track || !window.productsData) return;

    const picks = [
        productsData.bridal[1],
        productsData.casual[2],
        productsData.casual[6],
        productsData.casual[7],
        productsData.abaya[3],
        productsData.bags[4],
        productsData.shoes[1],
        productsData.kids[1]
    ].filter(Boolean);

    const wishlist = JSON.parse(localStorage.getItem('elegance_wishlist')) || [];
    track.innerHTML = picks.map((p, i) => `<div class="na-item">${productCard(p, wishlist, i)}</div>`).join('');
    initReveals();
}

function ratingStars(productId) {
    const seed = productId.split('').reduce((a, ch) => a + ch.charCodeAt(0), 0);
    const rating = Math.min(4.9, 4.0 + (seed % 9) / 10);
    const filled = Math.round(rating);
    let stars = '';
    for (let i = 0; i < 5; i++) stars += i < filled ? '&#9733;' : '&#9734;';
    return `<span class="rating">${stars}<span class="rate-num">${rating.toFixed(1)}</span></span>`;
}

function quickAdd(product) {
    const price = product.discount > 0 ? (product.price * (1 - product.discount / 100)) : product.price;
    const item = {
        id: product.id,
        name: product.name,
        category: product.category,
        price: Math.round(price),
        image: product.image,
        size: 'M',
        color: product.colors[0],
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('elegance_cart')) || [];
    const existing = cart.findIndex(i => i.id === item.id && i.size === item.size && i.color === item.color);

    if (existing > -1) {
        cart[existing].quantity += 1;
    } else {
        cart.push(item);
    }

    localStorage.setItem('elegance_cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${item.name} added to cart!`);
}

// ---------------- Product Modal ----------------
function openProductModal(product) {
    const discountedPrice = product.discount > 0 ? (product.price * (1 - product.discount / 100)) : product.price;
    currentProduct = { ...product, quantity: 1, size: 'M', color: product.colors[0], discountedPrice };

    document.getElementById('modal-name').innerText = product.name;
    document.getElementById('modal-final-price').innerText = formatPrice(discountedPrice);
    document.getElementById('modal-desc').innerText = product.description;

    const modalImg = document.getElementById('modal-img');
    modalImg.dataset.category = product.category;
    modalImg.onerror = () => imgFallback(modalImg);
    modalImg.src = imgPath(product.image);

    document.getElementById('modal-colors').innerHTML = product.colors.map((color, index) => `
        <div class="color-circle ${index === 0 ? 'active' : ''}"
             style="background: ${color};"
             onclick="selectColor(this, '${color}')"></div>
    `).join('');

    document.getElementById('modal-qty').innerText = '1';
    document.querySelectorAll('.size-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === 1);
    });

    const modal = document.getElementById('product-modal');
    modal.classList.add('show');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function updateQty(change) {
    if (!currentProduct) return;
    currentProduct.quantity = Math.max(1, currentProduct.quantity + change);
    document.getElementById('modal-qty').innerText = currentProduct.quantity;
    document.getElementById('modal-final-price').innerText = formatPrice(currentProduct.discountedPrice * currentProduct.quantity);
}

function selectSize(size, el) {
    if (!currentProduct) return;
    currentProduct.size = size;
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');
}

function selectColor(el, color) {
    if (!currentProduct) return;
    document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    currentProduct.color = color;
}

function addToCartFromModal() {
    if (!currentProduct) return;

    const item = {
        id: currentProduct.id,
        name: currentProduct.name,
        category: currentProduct.category,
        price: currentProduct.discountedPrice,
        image: currentProduct.image,
        size: currentProduct.size,
        color: currentProduct.color,
        quantity: currentProduct.quantity
    };

    let cart = JSON.parse(localStorage.getItem('elegance_cart')) || [];
    const existing = cart.findIndex(i => i.id === item.id && i.size === item.size && i.color === item.color);

    if (existing > -1) {
        cart[existing].quantity += item.quantity;
    } else {
        cart.push(item);
    }

    localStorage.setItem('elegance_cart', JSON.stringify(cart));
    updateCartCount();
    closeModal();
    showToast(`${item.name} added to cart!`);
}

// ---------------- Toast ----------------
function showToast(message) {
    document.querySelectorAll('.toast').forEach(t => t.remove());
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// ---------------- Countdown ----------------
function startCountdown() {
    const end = new Date().getTime() + 24 * 60 * 60 * 1000;
    const tick = () => {
        const diff = Math.max(0, end - new Date().getTime());
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        const pad = n => String(n).padStart(2, '0');
        if (document.getElementById('hours')) document.getElementById('hours').innerText = pad(h);
        if (document.getElementById('minutes')) document.getElementById('minutes').innerText = pad(m);
        if (document.getElementById('seconds')) document.getElementById('seconds').innerText = pad(s);
    };
    tick();
    setInterval(tick, 1000);
}
