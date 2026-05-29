document.addEventListener('DOMContentLoaded', () => {
    const products = window.VAPOR_PRODUCTS || [];
    const shared = window.VaporShared;
    const cart = shared.getCart();

    shared.applyFuturisticTheme();
    shared.updateCartNavUI(cart);
    shared.setupCartDropdown();
    shared.setupMobileNav();
    setupSearchRedirect();
    setupCategoryRouting();
    setupQuickViewModal();
    renderFeatured(products, cart, shared);
    shared.setupScrollAnimations();
    shared.setupHoverAnimations();
    shared.setupJellyAnimations();
});

function setupSearchRedirect() {
    const input = document.getElementById('search-input');
    if (!input) return;
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const q = encodeURIComponent(input.value.trim());
            window.location.href = q ? `products.html?q=${q}` : 'products.html';
        }
    });
}

function setupCategoryRouting() {
    window.filterByCategory = (category) => {
        window.location.href = `products.html?category=${encodeURIComponent(category)}`;
    };
}

function setupQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    const closeButton = document.getElementById('close-modal');
    if (!modal || !closeButton) return;

    closeButton.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

function renderFeatured(products, cart, shared) {
    const container = document.getElementById('featured-products');
    if (!container) return;
    const featured = products.filter((p) => p.popular).slice(0, 8);
    container.innerHTML = '';
    featured.forEach((product) => container.appendChild(createCard(product, cart, shared)));
    setupFeaturedCarousel(container);
    shared.animateStagger(Array.from(container.children));
    shared.setupHoverAnimations(container);
    shared.setupScrollAnimations(container);
    shared.setupJellyAnimations(container);
}

function createCard(product, cart, shared) {
    const productUrl = shared.getProductUrl(product);
    const card = document.createElement('div');
    card.className = 'product-card snap-start shrink-0 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300';
    card.style.flex = '0 0 300px';
    card.style.width = '300px';
    card.innerHTML = `
        <a href="${productUrl}" class="relative block aspect-[4/3] w-full overflow-hidden bg-gray-100">
            <img src="${product.image}" alt="${product.name}" class="absolute inset-0 h-full w-full object-cover object-[center_32%]" loading="lazy" decoding="async">
            ${product.new ? '<span class="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>' : ''}
        </a>
        <div class="p-4 min-w-0">
            <div class="flex justify-between items-start mb-2 gap-2 min-w-0">
                <h3 class="font-semibold text-base text-gray-900 line-clamp-2 min-w-0 flex-1 break-words">
                    <a href="${productUrl}" class="hover:underline">${product.name}</a>
                </h3>
                <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full shrink-0">In Stock</span>
            </div>
            <p class="text-gray-600 text-sm mb-2 truncate">${product.brand}</p>
            <p class="text-gray-700 text-sm mb-3 line-clamp-2 break-words">${product.description}</p>
            <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-4 min-w-0">
                <span class="text-lg font-bold tabular-nums" style="color: var(--secondary);">$${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="text-gray-400 line-through text-sm">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="flex flex-col sm:flex-row gap-2 min-w-0">
                <a href="${productUrl}" class="w-full sm:flex-1 min-w-0 bg-gray-100 text-gray-700 py-2 px-3 text-sm rounded-lg hover:bg-gray-200 transition-colors text-center">View Details</a>
                <button type="button" class="add-to-cart-btn w-full sm:flex-1 min-w-0 btn-primary text-white py-2 px-3 text-sm rounded-lg">Add to Cart</button>
            </div>
        </div>
    `;

    card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        shared.addToCart(cart, product, 1);
        shared.showNotification(`${product.name} added to cart!`, 'success');
    });

    return card;
}

function setupFeaturedCarousel(container) {
    if (container.dataset.continuousBound === 'true') return;

    const initialCards = Array.from(container.children);
    if (initialCards.length < 2) return;

    initialCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        container.appendChild(clone);
    });

    const speed = 0.75;
    let virtualOffset = container.scrollLeft;
    let rafId = null;

    const animate = () => {
        virtualOffset += speed;
        if (virtualOffset >= container.scrollWidth / 2) {
            virtualOffset = 0;
        }
        container.scrollLeft = virtualOffset;
        rafId = window.requestAnimationFrame(animate);
    };

    container.dataset.continuousBound = 'true';
    rafId = window.requestAnimationFrame(animate);

    window.addEventListener('beforeunload', () => {
        if (rafId) window.cancelAnimationFrame(rafId);
    });
}

function openQuickView(product, cart, shared) {
    const modal = document.getElementById('quick-view-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <img src="${product.image}" alt="${product.name}" class="w-full h-96 object-cover rounded-lg">
            </div>
            <div>
                <h2 class="text-3xl font-bold mb-4" style="color: var(--primary);">${product.name}</h2>
                <p class="text-gray-600 mb-4">${product.brand}</p>
                <p class="text-gray-700 mb-6">${product.description}</p>
                <ul class="list-disc list-inside text-gray-600 mb-6">
                    ${product.features.map((feature) => `<li>${feature}</li>`).join('')}
                </ul>
                <button id="modal-add-to-cart" class="btn-primary text-white py-3 px-6 rounded-lg font-semibold w-full">Add to Cart</button>
            </div>
        </div>
    `;

    const btn = document.getElementById('modal-add-to-cart');
    if (btn) {
        btn.addEventListener('click', () => {
            shared.addToCart(cart, product, 1);
            shared.showNotification(`${product.name} added to cart!`, 'success');
            modal.classList.add('hidden');
        });
    }

    modal.classList.remove('hidden');
}
