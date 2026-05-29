const productsState = {
    filters: {
        categories: [],
        brands: [],
        nicotine: [],
        priceMax: 100,
        search: ''
    },
    sort: 'name',
    comparison: []
};

function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text == null ? '' : String(text);
    return d.innerHTML;
}

function labelForCategoryInput(value) {
    const input = document.querySelector(`input.category-filter[value="${CSS.escape(value)}"]`);
    const span = input?.closest('label')?.querySelector('span');
    return span ? span.textContent.trim() : value;
}

function labelForBrandInput(value) {
    const input = document.querySelector(`input.brand-filter[value="${CSS.escape(value)}"]`);
    const span = input?.closest('label')?.querySelector('span');
    return span ? span.textContent.trim() : value;
}

function labelForNicotineInput(value) {
    const input = document.querySelector(`input.nicotine-filter[value="${CSS.escape(value)}"]`);
    const span = input?.closest('label')?.querySelector('span');
    return span ? span.textContent.trim() : value;
}

function hasActiveFilters() {
    const f = productsState.filters;
    return (
        f.categories.length > 0 ||
        f.brands.length > 0 ||
        f.nicotine.length > 0 ||
        Boolean(f.search && f.search.trim()) ||
        f.priceMax < 100
    );
}

function syncUrlFromFilters() {
    const params = new URLSearchParams();
    if (productsState.filters.categories.length === 1) {
        params.set('category', productsState.filters.categories[0]);
    }
    if (productsState.filters.search && productsState.filters.search.trim()) {
        params.set('q', productsState.filters.search.trim());
    }
    const qs = params.toString();
    const base = window.location.pathname;
    const newUrl = qs ? `${base}?${qs}` : base;
    history.replaceState(null, '', newUrl);
}

function removeFilterChip(type, rawValue, products, cart, shared) {
    const value = rawValue;
    if (type === 'category') {
        productsState.filters.categories = productsState.filters.categories.filter((v) => v !== value);
        const cb = document.querySelector(`input.category-filter[value="${CSS.escape(value)}"]`);
        if (cb) cb.checked = false;
    } else if (type === 'brand') {
        productsState.filters.brands = productsState.filters.brands.filter((v) => v !== value);
        const cb = document.querySelector(`input.brand-filter[value="${CSS.escape(value)}"]`);
        if (cb) cb.checked = false;
    } else if (type === 'nicotine') {
        productsState.filters.nicotine = productsState.filters.nicotine.filter((v) => v !== value);
        const cb = document.querySelector(`input.nicotine-filter[value="${CSS.escape(value)}"]`);
        if (cb) cb.checked = false;
    } else if (type === 'search') {
        productsState.filters.search = '';
        document.querySelectorAll('#search-input, #search-input-mobile').forEach((input) => {
            input.value = '';
        });
    } else if (type === 'price') {
        productsState.filters.priceMax = 100;
        const range = document.getElementById('price-range');
        if (range) range.value = '100';
        const view = document.getElementById('price-value');
        if (view) view.textContent = '$100+';
    }
    renderProducts(products, cart, shared);
}

function clearAllFilters(products, cart, shared) {
    document.querySelectorAll('.category-filter, .brand-filter, .nicotine-filter').forEach((cb) => {
        cb.checked = false;
    });
    productsState.filters = { categories: [], brands: [], nicotine: [], priceMax: 100, search: '' };
    document.querySelectorAll('#search-input, #search-input-mobile').forEach((input) => {
        input.value = '';
    });
    const range = document.getElementById('price-range');
    if (range) {
        range.value = '100';
        const view = document.getElementById('price-value');
        if (view) view.textContent = '$100+';
    }
    renderProducts(products, cart, shared);
}

function updateActiveFiltersUI() {
    const host = document.getElementById('active-filters');
    const banner = document.getElementById('filter-from-chat-banner');
    if (!host) return;

    const chips = [];
    const f = productsState.filters;

    f.categories.forEach((v) => {
        const label = `Category: ${labelForCategoryInput(v)}`;
        chips.push({ type: 'category', value: v, label });
    });
    f.brands.forEach((v) => {
        const label = `Brand: ${labelForBrandInput(v)}`;
        chips.push({ type: 'brand', value: v, label });
    });
    f.nicotine.forEach((v) => {
        const label = `Nicotine: ${labelForNicotineInput(v)}`;
        chips.push({ type: 'nicotine', value: v, label });
    });
    if (f.search && f.search.trim()) {
        const q = f.search.trim();
        chips.push({ type: 'search', value: q, label: `Search: “${q}”` });
    }
    if (f.priceMax < 100) {
        chips.push({ type: 'price', value: String(f.priceMax), label: `Max price: $${f.priceMax}` });
    }

    if (!chips.length) {
        host.innerHTML = '';
        host.classList.add('hidden');
        if (banner) banner.classList.add('hidden');
        return;
    }

    host.classList.remove('hidden');
    if (banner) banner.classList.remove('hidden');

    host.innerHTML = chips
        .map((c) => {
            const encVal =
                c.type === 'search' ? encodeURIComponent(c.value) : encodeURIComponent(String(c.value));
            return `<span class="filter-chip" role="listitem">
  ${escapeHtml(c.label)}
  <button type="button" class="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-white/90 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60" aria-label="Remove filter" data-filter-type="${escapeHtml(c.type)}" data-filter-value="${encVal}">×</button>
</span>`;
        })
        .join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const products = window.VAPOR_PRODUCTS || [];
    const shared = window.VaporShared;
    const cart = shared.getCart();

    shared.applyFuturisticTheme();
    shared.updateCartNavUI(cart);
    shared.setupCartDropdown();
    shared.setupMobileNav();
    setupQuickViewModal();
    setupControls(products, cart, shared);
    seedFiltersFromUrl();
    renderProducts(products, cart, shared);
    shared.setupScrollAnimations();
    shared.setupHoverAnimations();
    shared.setupJellyAnimations();
});

function setupQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    const closeButton = document.getElementById('close-modal');
    if (!modal || !closeButton) return;

    closeButton.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.classList.add('hidden');
    });
}

function setupControls(products, cart, shared) {
    const searchInputs = Array.from(document.querySelectorAll('#search-input, #search-input-mobile'));
    if (searchInputs.length) {
        searchInputs.forEach((input) => {
            input.addEventListener('input', (event) => {
                const value = event.target.value.trim();
                productsState.filters.search = value;
                searchInputs.forEach((other) => {
                    if (other !== event.target) other.value = value;
                });
                renderProducts(products, cart, shared);
            });
        });
    }

    document.querySelectorAll('.category-filter').forEach((cb) => cb.addEventListener('change', () => {
        productsState.filters.categories = Array.from(document.querySelectorAll('.category-filter:checked')).map((e) => e.value);
        renderProducts(products, cart, shared);
    }));

    document.querySelectorAll('.brand-filter').forEach((cb) => cb.addEventListener('change', () => {
        productsState.filters.brands = Array.from(document.querySelectorAll('.brand-filter:checked')).map((e) => e.value);
        renderProducts(products, cart, shared);
    }));

    document.querySelectorAll('.nicotine-filter').forEach((cb) => cb.addEventListener('change', () => {
        productsState.filters.nicotine = Array.from(document.querySelectorAll('.nicotine-filter:checked')).map((e) => e.value);
        renderProducts(products, cart, shared);
    }));

    const range = document.getElementById('price-range');
    if (range) {
        range.addEventListener('input', () => {
            productsState.filters.priceMax = Number(range.value);
            const view = document.getElementById('price-value');
            if (view) view.textContent = range.value >= 100 ? '$100+' : `$${range.value}`;
            renderProducts(products, cart, shared);
        });
    }

    const sort = document.getElementById('sort-select');
    if (sort) {
        sort.addEventListener('change', () => {
            productsState.sort = sort.value;
            renderProducts(products, cart, shared);
        });
    }

    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => clearAllFilters(products, cart, shared));
    }

    const showAllBtn = document.getElementById('show-all-products-btn');
    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => clearAllFilters(products, cart, shared));
    }

    const activeHost = document.getElementById('active-filters');
    if (activeHost) {
        activeHost.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-filter-type]');
            if (!btn) return;
            e.preventDefault();
            const type = btn.getAttribute('data-filter-type');
            const raw = btn.getAttribute('data-filter-value') || '';
            let decoded = raw;
            try {
                decoded = decodeURIComponent(raw);
            } catch {
                decoded = raw;
            }
            removeFilterChip(type, decoded, products, cart, shared);
        });
    }

    const compareToggle = document.getElementById('compare-toggle');
    const comparisonPanel = document.getElementById('comparison-panel');
    const closeComparison = document.getElementById('close-comparison');
    if (compareToggle && comparisonPanel) {
        compareToggle.addEventListener('click', () => comparisonPanel.classList.toggle('active'));
    }
    if (closeComparison && comparisonPanel) {
        closeComparison.addEventListener('click', () => comparisonPanel.classList.remove('active'));
    }

    const loadMore = document.getElementById('load-more');
    if (loadMore) {
        loadMore.addEventListener('click', () => shared.showNotification('All products are already loaded.', 'info'));
    }
}

function seedFiltersFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const q = params.get('q');

    if (category) {
        productsState.filters.categories = [category];
        const categoryBox = document.querySelector(`.category-filter[value="${CSS.escape(category)}"]`);
        if (categoryBox) categoryBox.checked = true;
    }

    if (q) {
        productsState.filters.search = q;
        document.querySelectorAll('#search-input, #search-input-mobile').forEach((input) => {
            input.value = q;
        });
    }
}

function applyFilters(products) {
    return products.filter((product) => {
        if (productsState.filters.categories.length && !productsState.filters.categories.includes(product.category)) return false;
        if (productsState.filters.brands.length && !productsState.filters.brands.includes(product.brand)) return false;
        if (productsState.filters.nicotine.length && !productsState.filters.nicotine.includes(product.nicotine)) return false;
        if (product.price > productsState.filters.priceMax) return false;
        if (productsState.filters.search && !product.name.toLowerCase().includes(productsState.filters.search.toLowerCase())) return false;
        return true;
    });
}

function sortProducts(products) {
    const sorted = [...products];
    switch (productsState.sort) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'popular':
            return sorted.sort((a, b) => Number(b.popular) - Number(a.popular));
        case 'newest':
            return sorted.sort((a, b) => Number(b.new) - Number(a.new));
        default:
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
}

function renderProducts(products, cart, shared) {
    const grid = document.getElementById('products-grid');
    const results = document.getElementById('results-count');
    if (!grid) return;

    const filtered = sortProducts(applyFilters(products));
    grid.innerHTML = '';
    filtered.forEach((product) => {
        const productUrl = shared.getProductUrl(product);
        // Full-bleed thumb: cover + focal point slightly above center (typical packshots)
        const imageClass = 'absolute inset-0 h-full w-full object-cover object-[center_32%]';

        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 min-w-0 max-w-full flex flex-col h-full';
        card.innerHTML = `
            <div class="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-gray-100">
                <a href="${productUrl}" class="block h-full w-full">
                    <img src="${product.image}" alt="${product.name}" class="${imageClass}" loading="lazy" decoding="async">
                </a>
                ${product.new ? '<span class="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full pointer-events-none">New</span>' : ''}
                <button type="button" class="compare-btn absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors shrink-0" aria-label="Add to compare">+</button>
            </div>
            <div class="p-3 sm:p-4 min-w-0 flex flex-col flex-1">
                <h3 class="font-semibold text-base sm:text-lg text-gray-900 line-clamp-2 break-words min-w-0">
                    <a href="${productUrl}" class="hover:underline">${product.name}</a>
                </h3>
                <p class="text-gray-600 text-sm mb-2 truncate min-w-0">${product.brand}</p>
                <p class="text-gray-700 text-sm mb-3 line-clamp-2 min-w-0 break-words">${product.description}</p>
                <div class="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-4 min-w-0">
                    <span class="text-lg sm:text-xl font-bold tabular-nums shrink-0" style="color: var(--secondary);">$${product.price.toFixed(2)}</span>
                    ${product.puffs ? `<span class="text-xs sm:text-sm text-gray-500 whitespace-nowrap">${product.puffs} puffs</span>` : ''}
                </div>
                <div class="flex flex-col sm:flex-row gap-2 mt-auto min-w-0">
                    <a href="${productUrl}" class="quick-view-btn w-full sm:flex-1 min-w-0 bg-gray-100 text-gray-700 py-2.5 px-3 sm:px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm text-center">
                        View Details
                    </a>
                    <button type="button" class="add-btn w-full sm:flex-1 min-w-0 btn-primary text-white py-2.5 px-3 sm:px-4 rounded-lg text-sm text-center ${product.inStock ? '' : 'opacity-60 cursor-not-allowed'}" ${product.inStock ? '' : 'disabled'}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        `;

        const addBtn = card.querySelector('.add-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                if (!product.inStock) return;
                shared.addToCart(cart, product, 1);
                shared.showNotification(`${product.name} added to cart!`, 'success');
            });
        }

        const compareBtn = card.querySelector('.compare-btn');
        if (compareBtn) {
            compareBtn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleComparison(product, shared);
            });
        }
        grid.appendChild(card);
    });

    if (results) results.textContent = `${filtered.length} products`;
    shared.animateStagger(Array.from(grid.children));
    shared.setupHoverAnimations(grid);
    shared.setupScrollAnimations(grid);
    shared.setupJellyAnimations(grid);

    updateActiveFiltersUI();
    syncUrlFromFilters();
}

function openQuickView(product, cart, shared) {
    const modal = document.getElementById('quick-view-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    const features = Array.isArray(product.features) ? product.features : [];

    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 min-w-0">
            <div class="bg-gray-50 rounded-xl p-3 sm:p-4 min-w-0 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full max-w-full h-72 sm:h-96 object-cover object-[center_32%] rounded-lg bg-gray-100">
            </div>
            <div class="min-w-0">
                <div class="flex items-start justify-between gap-3 mb-2 min-w-0">
                    <h2 class="text-xl sm:text-2xl md:text-3xl font-bold break-words min-w-0 pr-2" style="color: var(--primary);">${product.name}</h2>
                    ${product.new ? '<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full shrink-0">New</span>' : ''}
                </div>
                <p class="text-gray-600 mb-4 break-words">${product.brand}</p>
                <p class="text-gray-700 mb-5 break-words">${product.description || 'No description available for this product yet.'}</p>

                <div class="grid grid-cols-2 gap-3 mb-5 text-sm">
                    <div class="rounded-lg bg-gray-50 p-3">
                        <p class="text-gray-500">Price</p>
                        <p class="font-bold text-lg" style="color: var(--secondary);">$${product.price.toFixed(2)}</p>
                    </div>
                    <div class="rounded-lg bg-gray-50 p-3">
                        <p class="text-gray-500">Puffs</p>
                        <p class="font-semibold text-gray-900">${product.puffs ? `${product.puffs}` : 'N/A'}</p>
                    </div>
                    <div class="rounded-lg bg-gray-50 p-3">
                        <p class="text-gray-500">Nicotine</p>
                        <p class="font-semibold text-gray-900">${product.nicotine || 'N/A'}</p>
                    </div>
                    <div class="rounded-lg bg-gray-50 p-3">
                        <p class="text-gray-500">Availability</p>
                        <p class="font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}">${product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                    </div>
                </div>

                ${features.length ? `
                <div class="mb-6">
                    <h3 class="font-semibold text-gray-900 mb-2">Key Features</h3>
                    <ul class="list-disc list-inside text-gray-600 space-y-1">
                        ${features.map((feature) => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>` : ''}

                <button id="modal-add-to-cart" class="btn-primary text-white py-3 px-6 rounded-lg font-semibold w-full ${product.inStock ? '' : 'opacity-60 cursor-not-allowed'}" ${product.inStock ? '' : 'disabled'}>
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `;

    const btn = document.getElementById('modal-add-to-cart');
    if (btn && product.inStock) {
        btn.addEventListener('click', () => {
            shared.addToCart(cart, product, 1);
            shared.showNotification(`${product.name} added to cart!`, 'success');
            modal.classList.add('hidden');
        });
    }

    modal.classList.remove('hidden');
}

function toggleComparison(product, shared) {
    const idx = productsState.comparison.findIndex((item) => item.id === product.id);
    if (idx >= 0) {
        productsState.comparison.splice(idx, 1);
        shared.showNotification(`${product.name} removed from comparison`, 'info');
    } else if (productsState.comparison.length < 3) {
        productsState.comparison.push(product);
        shared.showNotification(`${product.name} added to comparison`, 'success');
    } else {
        shared.showNotification('Maximum 3 products can be compared', 'error');
    }
    renderComparison();
}

function renderComparison() {
    const count = document.getElementById('compare-count');
    const items = document.getElementById('comparison-items');
    if (count) count.textContent = String(productsState.comparison.length);
    if (!items) return;

    items.innerHTML = '';
    productsState.comparison.forEach((product) => {
        const el = document.createElement('div');
        el.className = 'bg-white p-4 rounded-lg shadow';
        el.innerHTML = `
            <div class="flex items-center gap-3 min-w-0">
                <img src="${product.image}" alt="" class="w-12 h-12 shrink-0 object-cover rounded">
                <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-sm line-clamp-2 break-words">${product.name}</h4>
                    <p class="text-xs text-gray-500 tabular-nums">$${product.price.toFixed(2)}</p>
                </div>
            </div>
        `;
        items.appendChild(el);
    });
}
