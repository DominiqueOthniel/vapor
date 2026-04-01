window.VaporShared = (() => {
    function ensureYouthFonts() {
        if (!document.getElementById('vapor-youth-fonts')) {
            const link = document.createElement('link');
            link.id = 'vapor-youth-fonts';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Syne:wght@500;600;700;800&family=Poppins:wght@600;700;800&display=swap';
            document.head.appendChild(link);
        }
    }

    function applyFuturisticTheme() {
        ensureYouthFonts();
        if (document.getElementById('vapor-futuristic-theme')) return;

        const style = document.createElement('style');
        style.id = 'vapor-futuristic-theme';
        style.textContent = `
            :root {
                --primary: #f1f4ff;
                --secondary: #9b6bff;
                --tertiary: #2dd4bf;
                --neutral: #090b14;
                --text: #dfe6ff;
                --accent-pink: #f472b6;
                --accent-cyan: #67e8f9;
            }

            body {
                font-family: 'Manrope', sans-serif !important;
                position: relative;
                overflow-x: hidden;
                color: var(--text);
                background:
                    radial-gradient(circle at 8% -12%, rgba(155, 107, 255, 0.25), transparent 34%),
                    radial-gradient(circle at 92% 0%, rgba(45, 212, 191, 0.2), transparent 36%),
                    radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.14), transparent 38%),
                    var(--neutral);
            }

            .hero-title,
            h1, h2,
            .brand-logo {
                font-family: 'Syne', sans-serif !important;
                letter-spacing: 0.01em;
            }

            .hero-title {
                font-family: 'Poppins', sans-serif !important;
                font-weight: 800 !important;
                letter-spacing: -0.01em;
            }

            h3, h4, h5, h6,
            p, span, a, li, label,
            input, textarea, select, button,
            .nav-link, .btn-primary, .btn-secondary {
                font-family: 'Manrope', sans-serif !important;
            }

            body::before {
                content: '';
                position: fixed;
                inset: -10%;
                z-index: -2;
                pointer-events: none;
                background:
                    radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.2), transparent 42%),
                    radial-gradient(circle at 80% 15%, rgba(103, 232, 249, 0.18), transparent 42%);
                filter: blur(34px);
                animation: vaporAurora 15s ease-in-out infinite alternate;
            }

            @keyframes vaporAurora {
                0% { transform: translate3d(-1%, -1%, 0) scale(1); }
                100% { transform: translate3d(1.2%, 1.4%, 0) scale(1.03); }
            }

            nav {
                background: rgba(8, 10, 20, 0.78) !important;
                border-color: rgba(139, 92, 246, 0.2) !important;
                box-shadow: 0 18px 32px -28px rgba(15, 16, 32, 0.88);
            }

            .nav-link::after {
                background: linear-gradient(90deg, var(--secondary), var(--tertiary)) !important;
            }

            .bg-white,
            section.bg-white,
            .bg-gray-50,
            section.bg-gray-50 {
                background-color: rgba(10, 13, 24, 0.76) !important;
                color: var(--text) !important;
            }

            #mobile-menu,
            #cart-dropdown,
            .order-summary,
            .filter-sidebar,
            .comparison-panel,
            .modal-content {
                background: rgba(11, 14, 26, 0.9) !important;
                color: var(--text) !important;
                border-color: rgba(139, 92, 246, 0.25) !important;
            }

            .text-gray-900 { color: #eef2ff !important; }
            .text-gray-800 { color: #e3e8ff !important; }
            .text-gray-700 { color: #d3daf6 !important; }
            .text-gray-600 { color: #c6d0ea !important; }
            .text-gray-500 { color: #aeb9d8 !important; }
            .text-gray-400 { color: #7f8caf !important; }

            input, textarea, select {
                background: rgba(19, 24, 40, 0.92) !important;
                color: #edf2ff !important;
                border-color: rgba(130, 145, 180, 0.38) !important;
            }

            input::placeholder,
            textarea::placeholder {
                color: #93a0c4 !important;
            }

            .product-card,
            .category-card,
            .filter-sidebar,
            .order-summary,
            .modal-content {
                border: 1px solid rgba(139, 92, 246, 0.2);
                box-shadow: 0 20px 36px -30px rgba(15, 16, 32, 0.85);
                transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
                            box-shadow 300ms cubic-bezier(0.22, 1, 0.36, 1),
                            border-color 300ms ease;
            }

            .category-card {
                --primary: #ecf2ff;
                background: linear-gradient(155deg, rgba(16, 22, 38, 0.94), rgba(23, 30, 52, 0.9)) !important;
                border-color: rgba(129, 140, 248, 0.35) !important;
            }

            .category-card h3,
            .category-card p {
                color: #dbe6ff !important;
                text-shadow: none !important;
            }

            .category-card .text-6xl {
                filter: saturate(1.15);
                display: inline-block;
                transform-origin: center;
                animation: categoryIconFloat 3.2s ease-in-out infinite;
                will-change: transform, filter;
            }

            .category-card:nth-child(2) .text-6xl { animation-delay: 0.25s; }
            .category-card:nth-child(3) .text-6xl { animation-delay: 0.5s; }
            .category-card:nth-child(4) .text-6xl { animation-delay: 0.75s; }

            .category-card:hover .text-6xl {
                animation: categoryIconHover 620ms cubic-bezier(0.22, 1, 0.36, 1);
                filter: saturate(1.25) drop-shadow(0 8px 14px rgba(139, 92, 246, 0.35));
            }

            @keyframes categoryIconFloat {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-6px) rotate(-2deg); }
            }

            @keyframes categoryIconHover {
                0% { transform: translateY(-2px) scale(1); }
                40% { transform: translateY(-7px) scale(1.08) rotate(-8deg); }
                70% { transform: translateY(-4px) scale(0.97) rotate(5deg); }
                100% { transform: translateY(-2px) scale(1) rotate(0deg); }
            }

            .product-card:hover,
            .category-card:hover,
            .order-summary:hover,
            .filter-sidebar:hover {
                transform: translateY(-8px);
                border-color: rgba(103, 232, 249, 0.58);
                box-shadow: 0 30px 46px -28px rgba(139, 92, 246, 0.45);
            }

            .product-card .quick-view-btn {
                background: rgba(24, 31, 54, 0.92) !important;
                color: #edf2ff !important;
                border: 1px solid rgba(167, 139, 250, 0.45) !important;
                font-weight: 600;
            }

            .product-card .quick-view-btn:hover {
                background: rgba(39, 50, 82, 0.96) !important;
                color: #ffffff !important;
            }

            .product-card .compare-btn {
                background: rgba(17, 24, 39, 0.92) !important;
                color: #f8fbff !important;
                border: 1px solid rgba(167, 139, 250, 0.72) !important;
                box-shadow: 0 10px 18px -12px rgba(15, 23, 42, 0.95);
            }

            .product-card .compare-btn:hover {
                background: rgba(139, 92, 246, 0.92) !important;
                color: #ffffff !important;
                border-color: rgba(196, 181, 253, 1) !important;
                box-shadow: 0 12px 22px -12px rgba(139, 92, 246, 0.7);
            }

            .product-card [class*='line-through'],
            .product-card .text-gray-400 {
                color: #a8b4d5 !important;
            }

            .product-card [style*='var(--secondary)'] {
                color: #a78bfa !important;
            }

            .btn-primary,
            .btn-secondary {
                position: relative;
                overflow: hidden;
                transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1),
                            box-shadow 250ms cubic-bezier(0.22, 1, 0.36, 1),
                            border-color 250ms ease;
            }

            .btn-primary {
                background: linear-gradient(135deg, #8b5cf6 0%, #f472b6 48%, #14b8a6 100%) !important;
                border: 1px solid rgba(177, 163, 255, 0.35);
                box-shadow: 0 20px 32px -20px rgba(139, 92, 246, 0.75);
            }

            .btn-secondary {
                border-color: rgba(139, 92, 246, 0.55) !important;
                color: #e8e2ff !important;
                background: rgba(43, 34, 74, 0.68) !important;
            }

            .cart-item {
                background: rgba(14, 18, 32, 0.88) !important;
                border: 1px solid rgba(139, 92, 246, 0.22) !important;
            }

            .cart-item h3 {
                color: #f3f6ff !important;
            }

            .cart-item p,
            .cart-item .text-sm,
            .cart-item .text-xs {
                color: #c9d3ee !important;
            }

            .quantity-btn {
                background: rgba(26, 33, 56, 0.95) !important;
                color: #f1f5ff !important;
                border-color: rgba(167, 139, 250, 0.5) !important;
            }

            .quantity-btn:hover {
                background: rgba(46, 58, 96, 0.96) !important;
                color: #ffffff !important;
                border-color: rgba(196, 181, 253, 0.82) !important;
            }

            .quantity-input {
                background: rgba(20, 26, 46, 0.94) !important;
                color: #f3f6ff !important;
                border: 1px solid rgba(168, 85, 247, 0.38) !important;
            }

            .remove-item {
                color: #fb7185 !important;
                font-weight: 600;
            }

            .remove-item:hover {
                color: #fecdd3 !important;
            }

            .order-summary h2,
            .order-summary h3,
            .order-summary label,
            .order-summary span {
                color: #eef2ff !important;
            }

            .order-summary {
                background: linear-gradient(145deg, rgba(10, 14, 28, 0.96), rgba(18, 24, 42, 0.94)) !important;
                box-shadow: 0 24px 40px -30px rgba(5, 8, 18, 0.95) !important;
            }

            .order-summary .text-green-600,
            .order-summary .text-green-500 {
                color: #86efac !important;
            }

            .order-summary hr {
                border-color: rgba(167, 139, 250, 0.45) !important;
            }

            .payment-method {
                background: rgba(24, 31, 54, 0.94) !important;
                color: #f1f5ff !important;
                border: 1px solid rgba(159, 173, 205, 0.42) !important;
            }

            .payment-method.active {
                background: linear-gradient(135deg, rgba(167, 139, 250, 0.72), rgba(45, 212, 191, 0.54)) !important;
                color: #f8faff !important;
                border-color: rgba(196, 181, 253, 0.85) !important;
            }

            .payment-method:hover {
                border-color: rgba(196, 181, 253, 0.68) !important;
                background: rgba(31, 40, 66, 0.96) !important;
            }

            .payment-form-panel {
                background: rgba(14, 20, 36, 0.85) !important;
                border-color: rgba(167, 139, 250, 0.35) !important;
            }

            .payment-input {
                background: rgba(21, 28, 49, 0.95) !important;
                color: #f2f6ff !important;
                border-color: rgba(173, 189, 221, 0.45) !important;
            }

            #apply-promo {
                color: #f2f6ff !important;
                background: rgba(99, 102, 241, 0.32) !important;
                border-color: rgba(167, 139, 250, 0.6) !important;
            }

            #apply-promo:hover {
                background: rgba(99, 102, 241, 0.48) !important;
            }

            .payment-note {
                color: #cbd5f5 !important;
            }

            .newsletter-input {
                background: rgba(20, 27, 46, 0.95) !important;
                color: #f0f4ff !important;
                border: 1px solid rgba(167, 139, 250, 0.48) !important;
                box-shadow: inset 0 1px 0 rgba(167, 139, 250, 0.22);
            }

            .newsletter-input::placeholder {
                color: #9fb0d6 !important;
                opacity: 1;
            }

            .newsletter-input:focus {
                border-color: rgba(139, 92, 246, 0.65) !important;
                box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.2) !important;
            }

            .newsletter-subscribe-btn {
                color: #ffffff !important;
                text-shadow: 0 1px 6px rgba(15, 23, 42, 0.45);
                border: 1px solid rgba(255, 255, 255, 0.35) !important;
            }

            .btn-primary::before,
            .btn-secondary::before {
                content: '';
                position: absolute;
                top: 0;
                left: -120%;
                width: 48%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(207, 250, 254, 0.35), transparent);
                transform: skewX(-20deg);
                transition: left 560ms ease;
                pointer-events: none;
            }

            .btn-primary:hover::before,
            .btn-secondary:hover::before {
                left: 145%;
            }

            .btn-primary:hover,
            .btn-secondary:hover {
                transform: translateY(-2px);
                box-shadow: 0 20px 34px -20px rgba(20, 184, 166, 0.45);
            }

            #mobile-menu {
                opacity: 0;
                transform: translateY(-10px) scale(0.985);
                transition: opacity 200ms ease, transform 200ms ease;
                pointer-events: none;
            }

            #mobile-menu.mobile-menu-open {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: auto;
            }

            #mobile-menu a {
                transition: background 180ms ease, transform 180ms ease;
            }

            #mobile-menu a:hover {
                transform: translateX(4px);
            }

            .reveal-scroll {
                opacity: 0;
                transform: translateY(22px) scale(0.985);
                transition: opacity 650ms cubic-bezier(0.22, 1, 0.36, 1),
                            transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
                transition-delay: var(--reveal-delay, 0ms);
                will-change: transform, opacity;
            }

            .reveal-scroll.in-view {
                opacity: 1;
                transform: translateY(0) scale(1);
            }

            .hover-tilt {
                transform-style: preserve-3d;
                transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
                            box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
                will-change: transform;
            }

            .hover-tilt.is-hovering {
                transform: translateY(-8px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
            }

            .nav-link {
                transition: color 220ms ease, transform 220ms ease;
            }

            .nav-link:hover {
                transform: translateY(-1px);
            }

            @media (prefers-reduced-motion: reduce) {
                .reveal-scroll {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }

                .hover-tilt {
                    transition: none;
                }

                .hover-tilt.is-hovering {
                    transform: none;
                }
            }

            .jelly-target {
                transform-origin: center;
                backface-visibility: hidden;
                will-change: transform;
            }

            .jelly-hover {
                animation: jellyHover 520ms cubic-bezier(0.25, 0.8, 0.25, 1);
            }

            .jelly-pop {
                animation: jellyPop 620ms cubic-bezier(0.22, 1, 0.36, 1);
            }

            .jelly-wobble {
                animation: jellyWobble 680ms cubic-bezier(0.22, 1, 0.36, 1);
            }

            @keyframes jellyHover {
                0% { transform: scale3d(1, 1, 1); }
                30% { transform: scale3d(1.05, 0.95, 1); }
                55% { transform: scale3d(0.98, 1.02, 1); }
                75% { transform: scale3d(1.02, 0.98, 1); }
                100% { transform: scale3d(1, 1, 1); }
            }

            @keyframes jellyPop {
                0% { transform: scale3d(1, 1, 1); }
                25% { transform: scale3d(0.92, 1.08, 1); }
                45% { transform: scale3d(1.08, 0.92, 1); }
                60% { transform: scale3d(0.98, 1.02, 1); }
                80% { transform: scale3d(1.02, 0.98, 1); }
                100% { transform: scale3d(1, 1, 1); }
            }

            @keyframes jellyWobble {
                0% { transform: translate3d(0, 0, 0) rotate(0deg); }
                22% { transform: translate3d(-1px, -2px, 0) rotate(-1.5deg); }
                44% { transform: translate3d(2px, 0, 0) rotate(1.3deg); }
                66% { transform: translate3d(-1px, 1px, 0) rotate(-0.8deg); }
                100% { transform: translate3d(0, 0, 0) rotate(0deg); }
            }

            /* White-gold theme overrides */
            :root {
                --primary: #1a1a1a !important;
                --secondary: #b87333 !important;
                --tertiary: #9caf88 !important;
                --neutral: #fafafa !important;
                --text: #2d2d2d !important;
            }

            body {
                color: #2d2d2d !important;
                background:
                    radial-gradient(circle at 8% -12%, rgba(184, 115, 51, 0.18), transparent 34%),
                    radial-gradient(circle at 92% 0%, rgba(156, 175, 136, 0.15), transparent 36%),
                    #fafafa !important;
            }

            nav {
                background: rgba(255, 255, 255, 0.92) !important;
                border-color: rgba(184, 115, 51, 0.2) !important;
            }

            .bg-white,
            section.bg-white {
                background: #ffffff !important;
                color: #2d2d2d !important;
            }

            .bg-gray-50,
            section.bg-gray-50 {
                background: #f7f7f7 !important;
                color: #2d2d2d !important;
            }

            #mobile-menu,
            #cart-dropdown,
            .order-summary,
            .filter-sidebar,
            .comparison-panel,
            .modal-content {
                background: rgba(255, 255, 255, 0.95) !important;
                color: #2d2d2d !important;
                border-color: rgba(184, 115, 51, 0.22) !important;
            }

            .product-card,
            .category-card,
            .filter-sidebar,
            .order-summary,
            .modal-content,
            .cart-item {
                background: #ffffff !important;
                color: #2d2d2d !important;
                border-color: rgba(184, 115, 51, 0.2) !important;
                box-shadow: 0 20px 36px -30px rgba(0, 0, 0, 0.28) !important;
            }

            .text-gray-900 { color: #111827 !important; }
            .text-gray-800 { color: #1f2937 !important; }
            .text-gray-700 { color: #374151 !important; }
            .text-gray-600 { color: #4b5563 !important; }
            .text-gray-500 { color: #6b7280 !important; }
            .text-gray-400 { color: #9ca3af !important; }

            .category-card {
                --primary: #1a1a1a !important;
                background: linear-gradient(155deg, #ffffff, #f6f7fb) !important;
            }

            .category-card h3,
            .category-card p {
                color: #1f2937 !important;
            }

            .product-card .quick-view-btn {
                background: #eef1f7 !important;
                color: #111827 !important;
                border: 1px solid #d9e0ef !important;
            }

            .product-card .quick-view-btn:hover {
                background: #e3e8f4 !important;
                color: #0f172a !important;
            }

            .quantity-btn {
                background: #ffffff !important;
                color: #111827 !important;
                border-color: #ddd !important;
            }

            .quantity-btn:hover {
                background: #f5e6d8 !important;
                color: #4a2e18 !important;
                border-color: #b87333 !important;
            }

            .quantity-input,
            .payment-input,
            input,
            textarea,
            select,
            .newsletter-input {
                background: #ffffff !important;
                color: #111827 !important;
                border-color: rgba(120, 120, 120, 0.35) !important;
            }

            .newsletter-input::placeholder,
            input::placeholder,
            textarea::placeholder {
                color: #6b7280 !important;
            }

            .payment-method {
                background: #ffffff !important;
                color: #1f2937 !important;
                border: 1px solid #d4d9e6 !important;
            }

            .payment-method.active {
                background: linear-gradient(135deg, rgba(184, 115, 51, 0.24), rgba(212, 165, 116, 0.24)) !important;
                color: #3f2a17 !important;
                border-color: rgba(184, 115, 51, 0.6) !important;
            }

            .payment-note,
            .remove-item {
                color: #6b7280 !important;
            }

            .btn-primary,
            .newsletter-subscribe-btn,
            #checkout-now,
            #compare-details {
                background: linear-gradient(135deg, #a66a2e 0%, #c78a4a 45%, #e7c08a 100%) !important;
                color: #fffaf2 !important;
                border: 1px solid rgba(122, 74, 33, 0.38) !important;
                text-shadow: 0 1px 6px rgba(74, 42, 16, 0.45);
                box-shadow: 0 16px 28px -18px rgba(151, 97, 42, 0.6) !important;
            }

            .btn-primary:hover,
            .newsletter-subscribe-btn:hover,
            #checkout-now:hover,
            #compare-details:hover {
                background: linear-gradient(135deg, #b67533 0%, #d59a57 48%, #efc891 100%) !important;
                border-color: rgba(122, 74, 33, 0.55) !important;
                box-shadow: 0 18px 32px -18px rgba(151, 97, 42, 0.72) !important;
            }

            .btn-secondary,
            #apply-promo,
            #reserve-items {
                background: linear-gradient(135deg, #fff8ee 0%, #f5eadc 100%) !important;
                color: #6a441f !important;
                border: 1px solid rgba(184, 133, 74, 0.46) !important;
                box-shadow: 0 10px 20px -18px rgba(122, 74, 33, 0.45) !important;
            }

            .btn-secondary:hover,
            #apply-promo:hover,
            #reserve-items:hover {
                background: linear-gradient(135deg, #f7ecd9 0%, #eddcc4 100%) !important;
                color: #5a3718 !important;
                border-color: rgba(161, 113, 59, 0.62) !important;
            }

            /* Final white-gold contrast fixes (override previous dark rules) */
            .cart-item h3,
            .cart-item p,
            .cart-item .text-sm,
            .cart-item .text-xs,
            .cart-item span,
            .cart-item label {
                color: #1f2937 !important;
            }

            .cart-item [style*='var(--secondary)'] {
                color: #b87333 !important;
            }

            .order-summary,
            .order-summary *,
            #payment-methods .payment-method,
            #card-payment-panel,
            #paypal-payment-panel,
            #payment-mode-label {
                color: #1f2937 !important;
            }

            .order-summary h2,
            .order-summary h3,
            .order-summary label,
            .order-summary span,
            .order-summary p {
                color: #1f2937 !important;
            }

            .order-summary .text-green-600,
            .order-summary .text-green-500 {
                color: #15803d !important;
            }

            #payment-methods .payment-method.active {
                color: #4a2e18 !important;
            }

            .payment-note,
            #payment-mode-label {
                color: #4b5563 !important;
            }

            #recommended-products .product-card h3,
            #recommended-products .product-card p,
            #recommended-products .product-card span {
                color: #1f2937 !important;
            }
        `;

        document.head.appendChild(style);
    }

    function getCart() {
        const saved = localStorage.getItem('vapor_cart');
        if (!saved) return { items: [], total: 0, itemCount: 0 };
        const parsed = JSON.parse(saved);
        parsed.total = parsed.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        parsed.itemCount = parsed.items.reduce((sum, item) => sum + item.quantity, 0);
        return parsed;
    }

    function saveCart(cart) {
        localStorage.setItem('vapor_cart', JSON.stringify(cart));
    }

    function recalcCart(cart) {
        cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        return cart;
    }

    function updateCartNavUI(cart) {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        const cartItems = document.getElementById('cart-items');

        if (cartCount) {
            cartCount.textContent = String(cart.itemCount);
            if (cart.itemCount === 0) {
                cartCount.classList.add('hidden');
            } else {
                cartCount.classList.remove('hidden');
            }
        }

        if (cartTotal) {
            cartTotal.textContent = `$${cart.total.toFixed(2)}`;
        }

        if (cartItems) {
            if (cart.items.length === 0) {
                cartItems.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
                return;
            }

            cartItems.innerHTML = '';
            cart.items.forEach((item) => {
                const row = document.createElement('div');
                row.className = 'flex items-center gap-3 p-2 border-b last:border-b-0';
                row.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                    <div class="flex-1">
                        <h4 class="font-medium text-sm">${item.name}</h4>
                        <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold text-sm">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                `;
                cartItems.appendChild(row);
            });
        }
    }

    function addToCart(cart, product, quantity = 1) {
        const existing = cart.items.find((item) => item.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.items.push({
                id: product.id,
                name: product.name,
                brand: product.brand,
                image: product.image,
                price: product.price,
                quantity
            });
        }
        recalcCart(cart);
        saveCart(cart);
        updateCartNavUI(cart);
    }

    function removeFromCart(cart, productId) {
        cart.items = cart.items.filter((item) => item.id !== productId);
        recalcCart(cart);
        saveCart(cart);
        updateCartNavUI(cart);
    }

    function updateCartQuantity(cart, productId, quantity) {
        const item = cart.items.find((entry) => entry.id === productId);
        if (!item) return;
        if (quantity <= 0) {
            removeFromCart(cart, productId);
            return;
        }
        item.quantity = quantity;
        recalcCart(cart);
        saveCart(cart);
        updateCartNavUI(cart);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full text-white';
        if (type === 'success') notification.classList.add('bg-green-500');
        else if (type === 'error') notification.classList.add('bg-red-500');
        else notification.classList.add('bg-blue-500');
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.remove('translate-x-full'), 20);
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 2600);
    }

    function setupCartDropdown() {
        const toggle = document.getElementById('cart-toggle');
        const dropdown = document.getElementById('cart-dropdown');
        if (!toggle || !dropdown) return;

        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target) && !toggle.contains(event.target)) {
                dropdown.classList.add('hidden');
            }
        });
    }

    function setupMobileNav() {
        const toggle = document.getElementById('mobile-menu-toggle');
        const menu = document.getElementById('mobile-menu');
        if (!toggle || !menu) return;

        let hideTimer = null;

        const closeMenu = () => {
            menu.classList.remove('mobile-menu-open');
            toggle.setAttribute('aria-expanded', 'false');
            window.clearTimeout(hideTimer);
            hideTimer = window.setTimeout(() => menu.classList.add('hidden'), 200);
        };

        const openMenu = () => {
            window.clearTimeout(hideTimer);
            menu.classList.remove('hidden');
            requestAnimationFrame(() => {
                menu.classList.add('mobile-menu-open');
            });
            toggle.setAttribute('aria-expanded', 'true');
        };

        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            if (menu.classList.contains('hidden')) {
                openMenu();
                return;
            }
            closeMenu();
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target) && !toggle.contains(event.target)) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        });
    }

    function animateStagger(elements) {
        if (!elements || !elements.length) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        elements.forEach((element, index) => {
            if (!element || typeof element.animate !== 'function') return;
            element.animate(
                [
                    { opacity: 0, transform: 'translateY(16px) scale(0.985)' },
                    { opacity: 1, transform: 'translateY(0) scale(1)' }
                ],
                {
                    duration: 420,
                    delay: Math.min(index * 55, 420),
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    fill: 'both'
                }
            );
        });
    }

    // Apply theme immediately to avoid white/gold flash on initial paint.
    applyFuturisticTheme();

    function setupScrollAnimations(scope = document) {
        if (!scope || !('querySelectorAll' in scope)) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const targets = scope.querySelectorAll(
            'section h1, section h2, section h3, section p, .product-card, .category-card, .strategic-image, .order-summary, .filter-sidebar, .cart-item'
        );

        if (!targets.length) return;

        targets.forEach((element, index) => {
            if (!element.classList.contains('reveal-scroll')) {
                element.classList.add('reveal-scroll');
                element.style.setProperty('--reveal-delay', `${Math.min(index * 40, 260)}ms`);
            }
        });

        if (reduceMotion || !('IntersectionObserver' in window)) {
            targets.forEach((element) => element.classList.add('in-view'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -8% 0px'
        });

        targets.forEach((element) => observer.observe(element));
    }

    function setupHoverAnimations(scope = document) {
        if (!scope || !('querySelectorAll' in scope)) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const targets = scope.querySelectorAll('.product-card, .category-card, .strategic-image, .order-summary');
        targets.forEach((element) => {
            if (element.dataset.hoverReady === 'true') return;
            element.dataset.hoverReady = 'true';
            element.classList.add('hover-tilt');

            element.addEventListener('mousemove', (event) => {
                const rect = element.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
                element.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
                element.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
                element.classList.add('is-hovering');
            });

            element.addEventListener('mouseleave', () => {
                element.classList.remove('is-hovering');
                element.style.setProperty('--ry', '0deg');
                element.style.setProperty('--rx', '0deg');
            });
        });
    }

    function setupJellyAnimations(scope = document) {
        if (!scope || !('querySelectorAll' in scope)) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const selector = isMobile
            ? '.btn-primary, .btn-secondary, .quick-view-btn, .add-to-cart-btn, .add-btn, #mobile-menu a'
            : '.btn-primary, .btn-secondary, .quick-view-btn, .add-to-cart-btn, .add-btn, .category-card, .product-card, #mobile-menu a';

        const jellyTargets = scope.querySelectorAll(selector);

        jellyTargets.forEach((element) => {
            if (element.dataset.jellyReady === 'true') return;
            element.dataset.jellyReady = 'true';
            element.classList.add('jelly-target');

            const clearClasses = () => {
                element.classList.remove('jelly-hover', 'jelly-pop', 'jelly-wobble');
            };

            element.addEventListener('animationend', clearClasses);

            element.addEventListener('mouseenter', () => {
                element.classList.remove('jelly-hover');
                void element.offsetWidth;
                element.classList.add('jelly-hover');
            });

            element.addEventListener('click', () => {
                element.classList.remove('jelly-pop');
                void element.offsetWidth;
                element.classList.add('jelly-pop');
            });

            element.addEventListener('touchstart', () => {
                element.classList.remove('jelly-wobble');
                void element.offsetWidth;
                element.classList.add('jelly-wobble');
            }, { passive: true });
        });
    }

    const AGE_STORAGE_KEY = 'vapor_age_verified_v2_21';

    function setupAgeVerification() {
        let verified = false;
        try {
            verified = localStorage.getItem(AGE_STORAGE_KEY) === '1';
        } catch {
            verified = false;
        }
        if (verified) return;

        const run = () => {
            if (document.getElementById('vapor-age-gate')) return;

            const style = document.createElement('style');
            style.id = 'vapor-age-gate-styles';
            style.textContent = `
                #vapor-age-gate {
                    position: fixed;
                    inset: 0;
                    z-index: 2147483646;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left));
                    box-sizing: border-box;
                }
                #vapor-age-gate .vapor-age-gate__backdrop {
                    position: absolute;
                    inset: 0;
                    background: rgba(6, 8, 14, 0.88);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                #vapor-age-gate .vapor-age-gate__card {
                    position: relative;
                    width: 100%;
                    max-width: 420px;
                    border-radius: 18px;
                    padding: 1.75rem 1.5rem 1.5rem;
                    background: linear-gradient(165deg, rgba(18, 22, 36, 0.98), rgba(10, 12, 22, 0.99));
                    border: 1px solid rgba(184, 115, 51, 0.35);
                    box-shadow:
                        0 28px 64px rgba(0, 0, 0, 0.55),
                        0 0 0 1px rgba(255, 255, 255, 0.06) inset;
                    color: #eef2ff;
                    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
                }
                #vapor-age-gate .vapor-age-gate__logo {
                    width: 52px;
                    height: 52px;
                    object-fit: contain;
                    margin: 0 auto 1rem;
                    display: block;
                    filter: drop-shadow(0 6px 16px rgba(184, 115, 51, 0.35));
                }
                #vapor-age-gate h2 {
                    font-size: 1.35rem;
                    font-weight: 800;
                    letter-spacing: 0.02em;
                    text-align: center;
                    margin: 0 0 0.65rem;
                    color: #f8fafc;
                }
                #vapor-age-gate p.vapor-age-gate__lead {
                    font-size: 0.95rem;
                    line-height: 1.55;
                    color: #c6d0ea;
                    text-align: center;
                    margin: 0 0 1.25rem;
                }
                #vapor-age-gate .vapor-age-gate__actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.65rem;
                }
                #vapor-age-gate .vapor-age-gate__btn {
                    display: block;
                    width: 100%;
                    padding: 0.85rem 1rem;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    cursor: pointer;
                    border: none;
                    transition: transform 0.15s ease, filter 0.15s ease, box-shadow 0.15s ease;
                }
                #vapor-age-gate .vapor-age-gate__btn--yes {
                    background: linear-gradient(135deg, #b87333, #d4a574);
                    color: #0f0d0a;
                    box-shadow: 0 10px 28px rgba(184, 115, 51, 0.35);
                }
                #vapor-age-gate .vapor-age-gate__btn--yes:hover {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }
                #vapor-age-gate .vapor-age-gate__btn--no {
                    background: rgba(255, 255, 255, 0.06);
                    color: #cbd5f5;
                    border: 1px solid rgba(255, 255, 255, 0.14);
                }
                #vapor-age-gate .vapor-age-gate__btn--no:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                #vapor-age-gate p.vapor-age-gate__legal {
                    font-size: 0.72rem;
                    line-height: 1.45;
                    color: #8b95b3;
                    text-align: center;
                    margin: 1rem 0 0;
                }
                body.vapor-age-gate-open {
                    overflow: hidden !important;
                }
            `;
            document.head.appendChild(style);

            const root = document.createElement('div');
            root.id = 'vapor-age-gate';
            root.setAttribute('role', 'dialog');
            root.setAttribute('aria-modal', 'true');
            root.setAttribute('aria-labelledby', 'vapor-age-title');
            root.innerHTML = `
                <div class="vapor-age-gate__backdrop" aria-hidden="true"></div>
                <div class="vapor-age-gate__card">
                    <img class="vapor-age-gate__logo" src="resources/logo.png" alt="" width="52" height="52" decoding="async">
                    <h2 id="vapor-age-title">Age verification</h2>
                    <p class="vapor-age-gate__lead">This site offers nicotine vaping products. You must be <strong>21 years of age or older</strong> (or the legal age in your area) to continue.</p>
                    <div class="vapor-age-gate__actions">
                        <button type="button" class="vapor-age-gate__btn vapor-age-gate__btn--yes" id="vapor-age-yes">I am 21 or older — Enter site</button>
                        <button type="button" class="vapor-age-gate__btn vapor-age-gate__btn--no" id="vapor-age-no">I am under 21 — Leave</button>
                    </div>
                    <p class="vapor-age-gate__legal">Nicotine is addictive. Products are for adults only. By entering you confirm that you meet the legal age and accept responsibility to comply with local laws.</p>
                </div>
            `;
            document.body.appendChild(root);
            document.body.classList.add('vapor-age-gate-open');

            const closeGate = () => {
                root.remove();
                style.remove();
                document.body.classList.remove('vapor-age-gate-open');
            };

            const yes = root.querySelector('#vapor-age-yes');
            const no = root.querySelector('#vapor-age-no');
            if (yes) {
                yes.addEventListener('click', () => {
                    try {
                        localStorage.setItem(AGE_STORAGE_KEY, '1');
                    } catch {
                        /* ignore */
                    }
                    closeGate();
                });
            }
            if (no) {
                no.addEventListener('click', () => {
                    window.location.href = 'https://www.google.com';
                });
            }

            const focusable = yes || root;
            if (focusable && typeof focusable.focus === 'function') {
                setTimeout(() => focusable.focus(), 50);
            }

            root.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    if (no) no.click();
                }
            });
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', run, { once: true });
        } else {
            run();
        }
    }

    return {
        applyFuturisticTheme,
        getCart,
        saveCart,
        recalcCart,
        updateCartNavUI,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        showNotification,
        setupCartDropdown,
        setupMobileNav,
        animateStagger,
        setupScrollAnimations,
        setupHoverAnimations,
        setupJellyAnimations,
        setupAgeVerification
    };
})();

if (window.VaporShared && typeof window.VaporShared.setupAgeVerification === 'function') {
    window.VaporShared.setupAgeVerification();
}
