// VAPOR Premium Vape Store - Main JavaScript
// Comprehensive e-commerce functionality with cart management, filtering, and interactions

// Product Data
const products = [
    {
        id: 1,
        name: "Elf Bar BC5000",
        category: "disposable",
        brand: "Elf Bar",
        price: 12.99,
        originalPrice: 15.99,
        nicotine: "40mg",
        puffs: 5000,
        image: "resources/product-1.jpg",
        inStock: true,
        description: "Premium disposable vape with 5000 puffs and rich flavor selection",
        features: ["5000 Puffs", "40mg Nicotine", "Rechargeable", "Multiple Flavors"],
        popular: true,
        new: false
    },
    {
        id: 2,
        name: "Lost Mary OS5000",
        category: "disposable",
        brand: "Lost Mary",
        price: 14.99,
        originalPrice: 18.99,
        nicotine: "50mg",
        puffs: 5000,
        image: "resources/product-2.jpg",
        inStock: true,
        description: "Advanced disposable with exceptional flavor and smooth draw",
        features: ["5000 Puffs", "50mg Nicotine", "Mesh Coil", "Premium Flavors"],
        popular: true,
        new: true
    },
    {
        id: 3,
        name: "Geek Bar Pulse X",
        category: "disposable",
        brand: "Geek Bar",
        price: 16.99,
        originalPrice: 19.99,
        nicotine: "50mg",
        puffs: 25000,
        image: "resources/product-3.jpg",
        inStock: true,
        description: "High-capacity disposable with 25000 puffs and boost mode",
        features: ["25000 Puffs", "50mg Nicotine", "Boost Mode", "Full Screen"],
        popular: false,
        new: true
    },
    {
        id: 4,
        name: "Vaporesso XROS Pro",
        category: "kit",
        brand: "Vaporesso",
        price: 39.99,
        originalPrice: 49.99,
        nicotine: "Variable",
        puffs: null,
        image: "resources/product-4.jpg",
        inStock: true,
        description: "Premium pod system with adjustable airflow and OLED display",
        features: ["Adjustable Airflow", "OLED Display", "1200mAh Battery", "Top Fill"],
        popular: true,
        new: false
    },
    {
        id: 5,
        name: "Premium E-Liquid Collection",
        category: "liquid",
        brand: "Premium",
        price: 24.99,
        originalPrice: 29.99,
        nicotine: "3mg",
        puffs: null,
        image: "resources/product-5.jpg",
        inStock: true,
        description: "Three premium e-liquid flavors in 60ml bottles",
        features: ["3x 60ml Bottles", "3mg Nicotine", "High VG", "Premium Flavors"],
        popular: false,
        new: false
    },
    {
        id: 6,
        name: "Vape Coil & Accessory Kit",
        category: "accessory",
        brand: "Universal",
        price: 19.99,
        originalPrice: 24.99,
        nicotine: "N/A",
        puffs: null,
        image: "resources/product-6.jpg",
        inStock: true,
        description: "Complete accessory kit with coils, cotton, and tools",
        features: ["Multiple Coil Types", "Organic Cotton", "Cleaning Tools", "Carrying Case"],
        popular: false,
        new: false
    },
    {
        id: 7,
        name: "Luxury Pod System",
        category: "kit",
        brand: "Premium",
        price: 59.99,
        originalPrice: 79.99,
        nicotine: "Variable",
        puffs: null,
        image: "resources/product-7.jpg",
        inStock: true,
        description: "Luxury pod system with rose gold finish and premium features",
        features: ["Rose Gold Finish", "Premium Build", "Fast Charging", "Leak Proof"],
        popular: false,
        new: true
    },
    {
        id: 8,
        name: "Midnight Blue Disposable",
        category: "disposable",
        brand: "VooPoo",
        price: 13.99,
        originalPrice: 16.99,
        nicotine: "20mg",
        puffs: 3000,
        image: "resources/product-8.jpg",
        inStock: true,
        description: "Sleek disposable vape with midnight blue finish",
        features: ["3000 Puffs", "20mg Nicotine", "Compact Design", "Smooth Draw"],
        popular: false,
        new: false
    },
    {
        id: 9,
        name: "Vape Battery & Charger Set",
        category: "accessory",
        brand: "Universal",
        price: 29.99,
        originalPrice: 39.99,
        nicotine: "N/A",
        puffs: null,
        image: "resources/product-9.jpg",
        inStock: true,
        description: "High-capacity battery with USB-C fast charging",
        features: ["2000mAh Battery", "USB-C Charging", "LED Indicator", "Safety Protection"],
        popular: false,
        new: false
    },
    {
        id: 10,
        name: "Fruit Flavor E-Liquid Pack",
        category: "liquid",
        brand: "Fruit Master",
        price: 34.99,
        originalPrice: 42.99,
        nicotine: "6mg",
        puffs: null,
        image: "resources/product-10.jpg",
        inStock: true,
        description: "Collection of five premium fruit-flavored e-liquids",
        features: ["5x 30ml Bottles", "6mg Nicotine", "Natural Flavors", "High Quality"],
        popular: true,
        new: false
    },
    {
        id: 11,
        name: "Compact Pod Kit",
        category: "kit",
        brand: "Vaporesso",
        price: 34.99,
        originalPrice: 44.99,
        nicotine: "Variable",
        puffs: null,
        image: "resources/product-11.jpg",
        inStock: true,
        description: "Compact pod system perfect for beginners",
        features: ["Compact Size", "Easy to Use", "Good Battery Life", "Refillable Pods"],
        popular: false,
        new: false
    },
    {
        id: 12,
        name: "Tropical Disposable Vape",
        category: "disposable",
        brand: "Tropical",
        price: 11.99,
        originalPrice: 14.99,
        nicotine: "30mg",
        puffs: 2500,
        image: "resources/product-12.jpg",
        inStock: true,
        description: "Tropical-themed disposable with exotic flavors",
        features: ["2500 Puffs", "30mg Nicotine", "Tropical Flavors", "Gradient Design"],
        popular: false,
        new: true
    },
    {
        id: 13,
        name: "Advanced Box Mod",
        category: "kit",
        brand: "VooPoo",
        price: 79.99,
        originalPrice: 99.99,
        nicotine: "Variable",
        puffs: null,
        image: "resources/product-13.jpg",
        inStock: true,
        description: "Advanced box mod with temperature control and OLED display",
        features: ["200W Max Power", "Temperature Control", "OLED Display", "Dual Battery"],
        popular: true,
        new: false
    },
    {
        id: 14,
        name: "Nicotine Salt Collection",
        category: "liquid",
        brand: "Salt Nic",
        price: 27.99,
        originalPrice: 34.99,
        nicotine: "20mg",
        puffs: null,
        image: "resources/product-14.jpg",
        inStock: true,
        description: "Three premium nicotine salt e-liquids in various flavors",
        features: ["3x 30ml Bottles", "20mg Nic Salts", "Smooth Hit", "Multiple Flavors"],
        popular: false,
        new: false
    },
    {
        id: 15,
        name: "Replacement Pod Pack",
        category: "accessory",
        brand: "Universal",
        price: 16.99,
        originalPrice: 21.99,
        nicotine: "N/A",
        puffs: null,
        image: "resources/product-15.jpg",
        inStock: true,
        description: "Pack of 4 replacement pods for various devices",
        features: ["4x Replacement Pods", "Multiple Resistances", "Easy to Install", "Long Lasting"],
        popular: false,
        new: false
    },
    {
        id: 16,
        name: "Mint Green Disposable",
        category: "disposable",
        brand: "Fresh",
        price: 10.99,
        originalPrice: 13.99,
        nicotine: "20mg",
        puffs: 2000,
        image: "resources/product-16.jpg",
        inStock: true,
        description: "Fresh mint green disposable with cooling menthol flavor",
        features: ["2000 Puffs", "20mg Nicotine", "Menthol Flavor", "Fresh Design"],
        popular: false,
        new: false
    },
    {
        id: 17,
        name: "Premium Vape Tank",
        category: "accessory",
        brand: "Premium",
        price: 44.99,
        originalPrice: 59.99,
        nicotine: "N/A",
        puffs: null,
        image: "resources/product-17.jpg",
        inStock: true,
        description: "High-quality vape tank with adjustable airflow",
        features: ["Adjustable Airflow", "Top Fill Design", "Sub-ohm Compatible", "Premium Build"],
        popular: false,
        new: true
    },
    {
        id: 18,
        name: "Starter Kit Package",
        category: "kit",
        brand: "Beginner",
        price: 49.99,
        originalPrice: 69.99,
        nicotine: "Variable",
        puffs: null,
        image: "resources/product-18.jpg",
        inStock: true,
        description: "Complete starter kit perfect for new vapers",
        features: ["Complete Kit", "Easy Setup", "Multiple Coils", "User Guide"],
        popular: true,
        new: false
    },
    {
        id: 19,
        name: "High-VG Cloud Collection",
        category: "liquid",
        brand: "Cloud Chaser",
        price: 39.99,
        originalPrice: 49.99,
        nicotine: "3mg",
        puffs: null,
        image: "resources/product-19.jpg",
        inStock: true,
        description: "Four high-VG e-liquids designed for massive clouds",
        features: ["4x 60ml Bottles", "3mg Nicotine", "80% VG", "Cloud Production"],
        popular: false,
        new: false
    },
    {
        id: 20,
        name: "Limited Edition Device",
        category: "kit",
        brand: "Limited",
        price: 99.99,
        originalPrice: 129.99,
        nicotine: "Variable",
        puffs: null,
        image: "resources/product-20.jpg",
        inStock: true,
        description: "Limited edition vape device with exclusive design",
        features: ["Limited Edition", "Exclusive Design", "Premium Materials", "Collector's Item"],
        popular: false,
        new: true
    },
    {
        id: 21,
        name: "Vape Accessory Kit",
        category: "accessory",
        brand: "Tool Master",
        price: 24.99,
        originalPrice: 32.99,
        nicotine: "N/A",
        puffs: null,
        image: "resources/product-21.jpg",
        inStock: true,
        description: "Essential accessories kit for vape maintenance",
        features: ["Cleaning Tools", "Replacement Parts", "Carrying Case", "User Manual"],
        popular: false,
        new: false
    },
    {
        id: 22,
        name: "Vaporesso Power Kit",
        category: "kit",
        brand: "Vaporesso",
        price: 89.99,
        originalPrice: 109.99,
        nicotine: "Variable",
        puffs: null,
        image: "IMG-20260325-WA0115-2.jpg",
        inStock: true,
        description: "High-performance Vaporesso kit with bold styling and advanced output control",
        features: ["Advanced Chipset", "Dual Power Mode", "Premium Tank", "Fast Charging"],
        popular: true,
        new: true
    }
];

// Global State
let cart = {
    items: [],
    total: 0,
    itemCount: 0
};

let currentFilters = {
    categories: [],
    brands: [],
    nicotine: [],
    priceMax: 100,
    search: ''
};

let comparisonItems = [];
let currentSort = 'name';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let revealObserver = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadCartFromStorage();
    initializeParticles();
    initializeVisualPolish();
    setupEventListeners();
    loadProducts();
    updateCartUI();
    
    // Initialize animations
    if (typeof anime !== 'undefined') {
        initializeAnimations();
    }
}

function initializeVisualPolish() {
    injectMotionStyles();
    initializeNavScrollEffect();
    initializeHeroParallax();
    initializeRevealAnimations();
    initializeMagneticButtons();
}

function injectMotionStyles() {
    if (document.getElementById('motion-polish-styles')) return;

    const style = document.createElement('style');
    style.id = 'motion-polish-styles';
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }

        body {
            overflow-x: hidden;
            background:
                radial-gradient(circle at 15% -10%, rgba(184, 115, 51, 0.12), transparent 30%),
                radial-gradient(circle at 88% 0%, rgba(156, 175, 136, 0.08), transparent 30%),
                #fafafa;
        }

        body::before {
            content: '';
            position: fixed;
            inset: -20%;
            pointer-events: none;
            z-index: -2;
            background:
                radial-gradient(circle at 18% 22%, rgba(184, 115, 51, 0.14), transparent 40%),
                radial-gradient(circle at 82% 12%, rgba(156, 175, 136, 0.11), transparent 38%),
                radial-gradient(circle at 50% 86%, rgba(0, 0, 0, 0.08), transparent 44%);
            filter: blur(26px);
            animation: ambientFlow 20s ease-in-out infinite alternate;
        }

        @keyframes ambientFlow {
            0% { transform: translate3d(-1.5%, -1.2%, 0) scale(1); }
            100% { transform: translate3d(2%, 1.8%, 0) scale(1.05); }
        }

        .reveal-on-scroll {
            opacity: 0;
            transform: translate3d(0, 22px, 0) scale(0.985);
            transition: opacity 640ms cubic-bezier(0.22, 1, 0.36, 1),
                        transform 640ms cubic-bezier(0.22, 1, 0.36, 1);
            transition-delay: var(--reveal-delay, 0ms);
            will-change: transform, opacity;
        }

        .reveal-on-scroll.is-visible {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }

        nav.nav-scrolled {
            box-shadow: 0 18px 35px -24px rgba(0, 0, 0, 0.45);
            background: rgba(255, 255, 255, 0.92);
            border-color: rgba(180, 180, 180, 0.28);
        }

        nav {
            transition: background 260ms ease, box-shadow 260ms ease, border-color 260ms ease;
        }

        .product-card,
        .category-card,
        .checkout-card,
        .order-summary,
        .filter-sidebar {
            border: 1px solid rgba(255, 255, 255, 0.7);
            border-radius: 1rem;
            box-shadow: 0 12px 30px -24px rgba(0, 0, 0, 0.35);
            transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
                        box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1);
            will-change: transform, box-shadow;
        }

        .product-card:hover,
        .category-card:hover,
        .checkout-card:hover,
        .order-summary:hover,
        .filter-sidebar:hover {
            transform: translateY(-6px);
            box-shadow: 0 24px 40px -28px rgba(0, 0, 0, 0.45);
        }

        .btn-primary,
        .btn-secondary {
            position: relative;
            overflow: hidden;
            border-radius: 0.9rem;
            letter-spacing: 0.01em;
            border: 1px solid rgba(0, 0, 0, 0.06);
            transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1),
                        box-shadow 250ms cubic-bezier(0.22, 1, 0.36, 1),
                        background 250ms ease;
            will-change: transform;
        }

        .btn-primary,
        a.btn-primary {
            background: linear-gradient(135deg, #ad642e 0%, #c88748 46%, #e0b07d 100%);
            box-shadow: 0 14px 24px -16px rgba(173, 100, 46, 0.75);
        }

        .btn-secondary {
            border-color: rgba(184, 115, 51, 0.38);
            box-shadow: 0 10px 18px -18px rgba(0, 0, 0, 0.6);
        }

        .btn-primary::before,
        a.btn-primary::before,
        .btn-secondary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -130%;
            width: 48%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.38), transparent);
            transform: skewX(-22deg);
            transition: left 620ms ease;
            pointer-events: none;
        }

        .btn-primary:hover::before,
        a.btn-primary:hover::before,
        .btn-secondary:hover::before {
            left: 150%;
        }

        .btn-primary:hover,
        a.btn-primary:hover,
        .btn-secondary:hover {
            box-shadow: 0 18px 34px -18px rgba(0, 0, 0, 0.35);
        }

        .btn-primary:active,
        .btn-secondary:active {
            transform: translateY(0) scale(0.99);
        }

        .search-input,
        .promo-input,
        input[type='text'],
        input[type='email'],
        input[type='number'],
        select {
            border-radius: 0.85rem;
            border: 1px solid rgba(23, 23, 23, 0.12);
            transition: border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
        }

        .search-input:focus,
        .promo-input:focus,
        input[type='text']:focus,
        input[type='email']:focus,
        input[type='number']:focus,
        select:focus {
            box-shadow: 0 0 0 4px rgba(184, 115, 51, 0.14);
            border-color: rgba(184, 115, 51, 0.52);
        }

        .quantity-btn {
            border-radius: 0.65rem;
        }

        #cart-toggle {
            border-radius: 0.8rem;
            transition: background 220ms ease, transform 220ms ease, color 220ms ease;
        }

        #cart-toggle:hover {
            background: rgba(0, 0, 0, 0.06);
            transform: translateY(-1px);
        }

        #cart-dropdown,
        .modal-content {
            border: 1px solid rgba(255, 255, 255, 0.72);
            box-shadow: 0 28px 46px -30px rgba(0, 0, 0, 0.5);
        }

        .nav-link {
            font-weight: 500;
            letter-spacing: 0.01em;
        }

        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, rgba(184, 115, 51, 0.75), rgba(156, 175, 136, 0.72));
            border-radius: 999px;
            border: 2px solid #f3f3f3;
        }

        ::-webkit-scrollbar-track {
            background: #f3f3f3;
        }

        @media (prefers-reduced-motion: reduce) {
            body::before {
                animation: none;
            }

            .reveal-on-scroll {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;

    document.head.appendChild(style);
}

// Particle Background System
function initializeParticles() {
    if (typeof p5 === 'undefined' || document.getElementById('particles-canvas') === null) return;
    
    new p5(function(p) {
        let particles = [];
        
        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('particles-canvas');
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(184, 115, 51, 100);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
            });
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// Event Listeners Setup
function setupEventListeners() {
    // Cart toggle
    const cartToggle = document.getElementById('cart-toggle');
    const cartDropdown = document.getElementById('cart-dropdown');
    
    if (cartToggle && cartDropdown) {
        cartToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleCartDropdown(cartDropdown);
        });
        
        document.addEventListener('click', function(e) {
            if (!cartDropdown.contains(e.target) && !cartToggle.contains(e.target)) {
                hideCartDropdown(cartDropdown);
            }
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Filter event listeners
    setupFilterListeners();
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // Cart functionality
    setupCartEventListeners();
    
    // Modal functionality
    setupModalListeners();
    
    // Comparison functionality
    setupComparisonListeners();
    
    // Load more products
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
}

function toggleCartDropdown(cartDropdown) {
    if (cartDropdown.classList.contains('hidden')) {
        showCartDropdown(cartDropdown);
        return;
    }

    hideCartDropdown(cartDropdown);
}

function showCartDropdown(cartDropdown) {
    cartDropdown.classList.remove('hidden');

    if (typeof anime === 'undefined' || prefersReducedMotion) return;

    anime.remove(cartDropdown);
    anime({
        targets: cartDropdown,
        opacity: [0, 1],
        translateY: [-12, 0],
        scale: [0.98, 1],
        duration: 320,
        easing: 'easeOutCubic'
    });
}

function hideCartDropdown(cartDropdown) {
    if (cartDropdown.classList.contains('hidden')) return;

    if (typeof anime === 'undefined' || prefersReducedMotion) {
        cartDropdown.classList.add('hidden');
        return;
    }

    anime.remove(cartDropdown);
    anime({
        targets: cartDropdown,
        opacity: [1, 0],
        translateY: [0, -10],
        scale: [1, 0.98],
        duration: 220,
        easing: 'easeInCubic',
        complete: () => {
            cartDropdown.classList.add('hidden');
            cartDropdown.style.opacity = '';
            cartDropdown.style.transform = '';
        }
    });
}

function setupFilterListeners() {
    // Category filters
    document.querySelectorAll('.category-filter').forEach(checkbox => {
        checkbox.addEventListener('change', updateFilters);
    });
    
    // Brand filters
    document.querySelectorAll('.brand-filter').forEach(checkbox => {
        checkbox.addEventListener('change', updateFilters);
    });
    
    // Nicotine filters
    document.querySelectorAll('.nicotine-filter').forEach(checkbox => {
        checkbox.addEventListener('change', updateFilters);
    });
    
    // Price range
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            const priceValue = document.getElementById('price-value');
            if (priceValue) {
                priceValue.textContent = this.value >= 100 ? '$100+' : `$${this.value}`;
            }
            currentFilters.priceMax = parseInt(this.value);
            updateFilters();
        });
    }
    
    // Clear filters
    const clearFilters = document.getElementById('clear-filters');
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            // Clear all checkboxes
            document.querySelectorAll('.category-filter, .brand-filter, .nicotine-filter').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Reset price range
            if (priceRange) {
                priceRange.value = 100;
                document.getElementById('price-value').textContent = '$100+';
            }
            
            // Reset filters
            currentFilters = {
                categories: [],
                brands: [],
                nicotine: [],
                priceMax: 100,
                search: ''
            };
            
            updateFilters();
        });
    }
}

function setupCartEventListeners() {
    // Checkout buttons
    const checkoutNow = document.getElementById('checkout-now');
    const reserveItems = document.getElementById('reserve-items');
    
    if (checkoutNow) {
        checkoutNow.addEventListener('click', function() {
            if (cart.items.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            showNotification('Redirecting to secure checkout...', 'success');
            // In a real app, this would redirect to payment processor
        });
    }
    
    if (reserveItems) {
        reserveItems.addEventListener('click', function() {
            if (cart.items.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            showNotification('Items reserved for 24 hours!', 'success');
        });
    }
    
    // Promo code
    const applyPromo = document.getElementById('apply-promo');
    if (applyPromo) {
        applyPromo.addEventListener('click', applyPromoCode);
    }
}

function setupModalListeners() {
    const modal = document.getElementById('quick-view-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.classList.add('hidden');
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
}

function setupComparisonListeners() {
    const compareToggle = document.getElementById('compare-toggle');
    const comparisonPanel = document.getElementById('comparison-panel');
    const closeComparison = document.getElementById('close-comparison');
    const compareDetails = document.getElementById('compare-details');
    
    if (compareToggle) {
        compareToggle.addEventListener('click', function() {
            if (comparisonPanel) {
                comparisonPanel.classList.toggle('active');
            }
        });
    }
    
    if (closeComparison && comparisonPanel) {
        closeComparison.addEventListener('click', function() {
            comparisonPanel.classList.remove('active');
        });
    }
    
    if (compareDetails) {
        compareDetails.addEventListener('click', function() {
            if (comparisonItems.length < 2) {
                showNotification('Please select at least 2 products to compare', 'error');
                return;
            }
            showComparisonModal();
        });
    }
}

// Product Loading and Filtering
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    const featuredProducts = document.getElementById('featured-products');
    const recommendedProducts = document.getElementById('recommended-products');
    
    if (productsGrid) {
        renderProducts(filterProducts(), productsGrid);
        updateResultsCount();
    }
    
    if (featuredProducts) {
        const featured = products.filter(p => p.popular).slice(0, 8);
        renderProducts(featured, featuredProducts);
    }
    
    if (recommendedProducts) {
        const recommended = products.filter(p => p.popular).slice(0, 4);
        renderProducts(recommended, recommendedProducts);
    }
}

function filterProducts() {
    return products.filter(product => {
        // Category filter
        if (currentFilters.categories.length > 0 && !currentFilters.categories.includes(product.category)) {
            return false;
        }
        
        // Brand filter
        if (currentFilters.brands.length > 0 && !currentFilters.brands.includes(product.brand)) {
            return false;
        }
        
        // Nicotine filter
        if (currentFilters.nicotine.length > 0 && !currentFilters.nicotine.includes(product.nicotine)) {
            return false;
        }
        
        // Price filter
        if (product.price > currentFilters.priceMax) {
            return false;
        }
        
        // Search filter
        if (currentFilters.search && !product.name.toLowerCase().includes(currentFilters.search.toLowerCase())) {
            return false;
        }
        
        return true;
    });
}

function renderProducts(products, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });

    registerRevealElements(container.querySelectorAll('.product-card'));
    initializeMagneticButtons(container);
    
    // Animate product cards
    if (typeof anime !== 'undefined') {
        anime({
            targets: container.children,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuart'
        });
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300';
    
    const inStockBadge = product.inStock ? 
        '<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Stock</span>' :
        '<span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Out of Stock</span>';
    
    const originalPriceHtml = product.originalPrice && product.originalPrice > product.price ? 
        `<span class="text-gray-400 line-through text-sm ml-2">$${product.originalPrice.toFixed(2)}</span>` : '';
    
    const newBadge = product.new ? 
        '<span class="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>' : '';
    
    card.innerHTML = `
        <div class="relative">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            ${newBadge}
            <button class="compare-btn absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors" data-product-id="${product.id}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
            </button>
        </div>
        <div class="p-4">
            <div class="flex justify-between items-start mb-2">
                <h3 class="font-semibold text-lg text-gray-900">${product.name}</h3>
                ${inStockBadge}
            </div>
            <p class="text-gray-600 text-sm mb-2">${product.brand}</p>
            <p class="text-gray-700 text-sm mb-3 line-clamp-2">${product.description}</p>
            <div class="flex items-center justify-between mb-4">
                <div>
                    <span class="text-xl font-bold" style="color: var(--secondary);">$${product.price.toFixed(2)}</span>
                    ${originalPriceHtml}
                </div>
                ${product.puffs ? `<span class="text-sm text-gray-500">${product.puffs} puffs</span>` : ''}
            </div>
            <div class="flex gap-2">
                <button class="quick-view-btn flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors" data-product-id="${product.id}">
                    Quick View
                </button>
                <button class="add-to-cart-btn flex-1 text-white py-2 px-4 rounded-lg transition-colors ${product.inStock ? 'btn-primary' : 'bg-gray-400 cursor-not-allowed'}" 
                        data-product-id="${product.id}" ${product.inStock ? '' : 'disabled'}>
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    card.querySelector('.quick-view-btn').addEventListener('click', function() {
        showQuickView(product);
    });
    
    card.querySelector('.add-to-cart-btn').addEventListener('click', function() {
        if (product.inStock) {
            addToCart(product);
        }
    });
    
    card.querySelector('.compare-btn').addEventListener('click', function() {
        toggleComparison(product);
    });

    if (!prefersReducedMotion) {
        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `translateY(-8px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    }
    
    return card;
}

// Cart Management
function addToCart(product, quantity = 1) {
    const existingItem = cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            brand: product.brand,
            quantity: quantity
        });
    }
    
    updateCartTotals();
    saveCartToStorage();
    updateCartUI();
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Animate add to cart
    if (typeof anime !== 'undefined') {
        anime({
            targets: `[data-product-id="${product.id}"].add-to-cart-btn`,
            scale: [1, 1.1, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    }
}

function removeFromCart(productId) {
    cart.items = cart.items.filter(item => item.id !== productId);
    updateCartTotals();
    saveCartToStorage();
    updateCartUI();
    renderCartItems();
    showNotification('Item removed from cart', 'info');
}

function updateCartQuantity(productId, quantity) {
    const item = cart.items.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCartTotals();
            saveCartToStorage();
            updateCartUI();
            renderCartItems();
        }
    }
}

function updateCartTotals() {
    cart.itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartCount) {
        cartCount.textContent = cart.itemCount;
        cartCount.classList.toggle('hidden', cart.itemCount === 0);
    }
    
    if (cartTotal) {
        cartTotal.textContent = `$${cart.total.toFixed(2)}`;
    }
    
    if (cartItems) {
        if (cart.items.length === 0) {
            cartItems.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = '';
            cart.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'flex items-center gap-3 p-2 border-b last:border-b-0';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                    <div class="flex-1">
                        <h4 class="font-medium text-sm">${item.name}</h4>
                        <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold text-sm">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                `;
                cartItems.appendChild(itemElement);
            });
        }
    }
}

function renderCartItems() {
    const cartContent = document.getElementById('cart-content');
    if (!cartContent) return;
    
    if (cart.items.length === 0) {
        const emptyTemplate = document.getElementById('empty-cart-template');
        if (emptyTemplate) {
            cartContent.innerHTML = emptyTemplate.innerHTML;
        }
        return;
    }
    
    cartContent.innerHTML = '';
    
    cart.items.forEach(item => {
        const itemTemplate = document.getElementById('cart-item-template');
        if (!itemTemplate) return;
        
        const itemElement = document.createElement('div');
        itemElement.innerHTML = itemTemplate.innerHTML;
        
        // Populate item data
        itemElement.querySelector('.cart-item-image').src = item.image;
        itemElement.querySelector('.cart-item-name').textContent = item.name;
        itemElement.querySelector('.cart-item-brand').textContent = item.brand;
        itemElement.querySelector('.cart-item-price').textContent = `$${(item.price * item.quantity).toFixed(2)}`;
        itemElement.querySelector('.quantity-input').value = item.quantity;
        
        // Add event listeners
        const decreaseBtn = itemElement.querySelector('.decrease-btn');
        const increaseBtn = itemElement.querySelector('.increase-btn');
        const quantityInput = itemElement.querySelector('.quantity-input');
        const removeBtn = itemElement.querySelector('.remove-item');
        
        decreaseBtn.addEventListener('click', () => {
            updateCartQuantity(item.id, item.quantity - 1);
        });
        
        increaseBtn.addEventListener('click', () => {
            updateCartQuantity(item.id, item.quantity + 1);
        });
        
        quantityInput.addEventListener('change', (e) => {
            const newQuantity = parseInt(e.target.value) || 1;
            updateCartQuantity(item.id, newQuantity);
        });
        
        removeBtn.addEventListener('click', () => {
            removeFromCart(item.id);
        });
        
        cartContent.appendChild(itemElement.firstElementChild);
    });
    
    updateOrderSummary();
}

function updateOrderSummary() {
    const subtotal = cart.total;
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const discount = 0; // Will be updated by promo codes
    const total = subtotal + shipping + tax - discount;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Filter and Search Functions
function updateFilters() {
    currentFilters.categories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
    currentFilters.brands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
    currentFilters.nicotine = Array.from(document.querySelectorAll('.nicotine-filter:checked')).map(cb => cb.value);
    
    updateActiveFilters();
    loadProducts();
}

function updateActiveFilters() {
    const activeFiltersContainer = document.getElementById('active-filters');
    if (!activeFiltersContainer) return;
    
    activeFiltersContainer.innerHTML = '';
    
    [...currentFilters.categories, ...currentFilters.brands, ...currentFilters.nicotine].forEach(filter => {
        if (filter) {
            const chip = document.createElement('span');
            chip.className = 'filter-chip';
            chip.innerHTML = `
                ${filter}
                <button class="remove-filter" data-filter="${filter}">&times;</button>
            `;
            
            chip.querySelector('.remove-filter').addEventListener('click', function() {
                removeFilter(this.dataset.filter);
            });
            
            activeFiltersContainer.appendChild(chip);
        }
    });
}

function removeFilter(filterValue) {
    // Remove from all filter arrays
    currentFilters.categories = currentFilters.categories.filter(f => f !== filterValue);
    currentFilters.brands = currentFilters.brands.filter(f => f !== filterValue);
    currentFilters.nicotine = currentFilters.nicotine.filter(f => f !== filterValue);
    
    // Uncheck corresponding checkbox
    document.querySelectorAll(`input[value="${filterValue}"]`).forEach(cb => {
        cb.checked = false;
    });
    
    updateFilters();
}

function handleSearch(e) {
    currentFilters.search = e.target.value;
    loadProducts();
}

function handleSort(e) {
    currentSort = e.target.value;
    loadProducts();
}

// Quick View Modal
function showQuickView(product) {
    const modal = document.getElementById('quick-view-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalContent) return;
    
    modalContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <img src="${product.image}" alt="${product.name}" class="w-full h-96 object-cover rounded-lg">
            </div>
            <div>
                <h2 class="text-3xl font-bold mb-4" style="color: var(--primary);">${product.name}</h2>
                <p class="text-gray-600 mb-4">${product.brand}</p>
                <p class="text-gray-700 mb-6">${product.description}</p>
                
                <div class="mb-6">
                    <h3 class="font-semibold mb-2">Features:</h3>
                    <ul class="list-disc list-inside text-gray-600">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <span class="text-3xl font-bold" style="color: var(--secondary);">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice && product.originalPrice > product.price ? 
                            `<span class="text-gray-400 line-through ml-2">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    ${product.puffs ? `<span class="text-gray-500">${product.puffs} puffs</span>` : ''}
                </div>
                
                <div class="flex gap-4">
                    <button class="btn-primary text-white py-3 px-6 rounded-lg font-semibold flex-1 ${product.inStock ? '' : 'bg-gray-400 cursor-not-allowed'}" 
                            onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" ${product.inStock ? '' : 'disabled'}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button class="border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                        ♡ Wishlist
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// Product Comparison
function toggleComparison(product) {
    const index = comparisonItems.findIndex(item => item.id === product.id);
    
    if (index > -1) {
        comparisonItems.splice(index, 1);
        showNotification(`${product.name} removed from comparison`, 'info');
    } else {
        if (comparisonItems.length >= 3) {
            showNotification('Maximum 3 products can be compared', 'error');
            return;
        }
        comparisonItems.push(product);
        showNotification(`${product.name} added to comparison`, 'success');
    }
    
    updateComparisonUI();
}

function updateComparisonUI() {
    const compareCount = document.getElementById('compare-count');
    const comparisonItemsContainer = document.getElementById('comparison-items');
    
    if (compareCount) {
        compareCount.textContent = comparisonItems.length;
    }
    
    if (comparisonItemsContainer) {
        comparisonItemsContainer.innerHTML = '';
        
        comparisonItems.forEach(product => {
            const item = document.createElement('div');
            item.className = 'bg-white p-4 rounded-lg shadow';
            item.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded">
                    <div class="flex-1">
                        <h4 class="font-medium text-sm">${product.name}</h4>
                        <p class="text-xs text-gray-500">$${product.price.toFixed(2)}</p>
                    </div>
                    <button class="text-red-500 hover:text-red-700" onclick="toggleComparison(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        ×
                    </button>
                </div>
            `;
            comparisonItemsContainer.appendChild(item);
        });
    }
}

function showComparisonModal() {
    // This would show a detailed comparison modal
    // For now, just show a notification
    showNotification('Detailed comparison feature coming soon!', 'info');
}

// Category Filtering
function filterByCategory(category) {
    currentFilters.categories = [category];
    
    // Update checkboxes
    document.querySelectorAll('.category-filter').forEach(cb => {
        cb.checked = cb.value === category;
    });
    
    updateFilters();
    
    // Navigate to products page if not already there
    if (!window.location.pathname.includes('products.html')) {
        window.location.href = 'products.html';
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set colors based on type
    switch (type) {
        case 'success':
            notification.className += ' bg-green-500 text-white';
            break;
        case 'error':
            notification.className += ' bg-red-500 text-white';
            break;
        case 'warning':
            notification.className += ' bg-yellow-500 text-black';
            break;
        default:
            notification.className += ' bg-blue-500 text-white';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        const filtered = filterProducts();
        resultsCount.textContent = `${filtered.length} products`;
    }
}

function loadMoreProducts() {
    // In a real app, this would load more products from the server
    showNotification('All products loaded!', 'info');
}

function applyPromoCode() {
    const promoInput = document.getElementById('promo-code');
    const promoCode = promoInput.value.trim().toLowerCase();
    
    const validCodes = {
        'vapor10': 0.10,
        'welcome20': 0.20,
        'save15': 0.15
    };
    
    if (validCodes[promoCode]) {
        const discount = cart.total * validCodes[promoCode];
        const discountRow = document.getElementById('discount-row');
        const discountEl = document.getElementById('discount');
        
        if (discountRow && discountEl) {
            discountRow.style.display = 'flex';
            discountEl.textContent = `-$${discount.toFixed(2)}`;
        }
        
        updateOrderSummary();
        showNotification(`Promo code applied! ${(validCodes[promoCode] * 100)}% off`, 'success');
        promoInput.value = '';
    } else {
        showNotification('Invalid promo code', 'error');
    }
}

function saveCartToStorage() {
    localStorage.setItem('vapor_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('vapor_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartTotals();
    }
}

function initializeAnimations() {
    // Animate hero title on load
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        anime({
            targets: heroTitle,
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            easing: 'easeOutQuart',
            delay: 500
        });
    }
    
    // Animate category cards
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards.length > 0) {
        anime({
            targets: categoryCards,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100, {start: 800}),
            duration: 600,
            easing: 'easeOutQuart'
        });
    }
}

function initializeNavScrollEffect() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const updateNavState = () => {
        nav.classList.toggle('nav-scrolled', window.scrollY > 16);
    };

    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
}

function initializeHeroParallax() {
    if (prefersReducedMotion) return;

    const heroSection = document.querySelector('section.relative.min-h-screen');
    const heroImage = heroSection ? heroSection.querySelector('img') : null;
    const heroTitle = document.querySelector('.hero-title');

    if (!heroSection || !heroImage || !heroTitle) return;

    let framePending = false;
    let targetX = 0;
    let targetY = 0;

    const render = () => {
        framePending = false;
        heroImage.style.transform = `scale(1.04) translate3d(${targetX * 14}px, ${targetY * 14}px, 0)`;
        heroTitle.style.transform = `translate3d(${targetX * -8}px, ${targetY * -8}px, 0)`;
    };

    heroSection.addEventListener('mousemove', (event) => {
        const rect = heroSection.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        targetX = Math.max(-1, Math.min(1, x));
        targetY = Math.max(-1, Math.min(1, y));

        if (!framePending) {
            framePending = true;
            requestAnimationFrame(render);
        }
    });

    heroSection.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
        if (!framePending) {
            framePending = true;
            requestAnimationFrame(render);
        }
    });
}

function initializeRevealAnimations() {
    const staticRevealTargets = document.querySelectorAll(
        'section h1, section h2, section p, .category-card, .filter-sidebar, .order-summary, .cart-item, footer'
    );

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        staticRevealTargets.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
    });

    registerRevealElements(staticRevealTargets);
}

function registerRevealElements(elements) {
    if (!elements || elements.length === 0) return;

    elements.forEach((element, index) => {
        if (!element.classList.contains('reveal-on-scroll')) {
            element.classList.add('reveal-on-scroll');
            element.style.setProperty('--reveal-delay', `${Math.min(index * 40, 260)}ms`);
        }

        if (prefersReducedMotion || !revealObserver) {
            element.classList.add('is-visible');
            return;
        }

        revealObserver.observe(element);
    });
}

function initializeMagneticButtons(scope = document) {
    if (prefersReducedMotion) return;

    scope.querySelectorAll('.btn-primary, .btn-secondary').forEach((button) => {
        if (button.dataset.magneticReady === 'true') return;
        button.dataset.magneticReady = 'true';

        button.addEventListener('mousemove', (event) => {
            const rect = button.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
            button.style.transform = `translate3d(${x * 6}px, ${y * 4}px, 0)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// Initialize page-specific functionality
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'cart.html':
            renderCartItems();
            break;
        case 'products.html':
            // Products page is already handled by loadProducts()
            break;
        default:
            // Index page is already handled by initializeApp()
            break;
    }
}

// Call page initialization
document.addEventListener('DOMContentLoaded', initializePage);