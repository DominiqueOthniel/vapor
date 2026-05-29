document.addEventListener('DOMContentLoaded', () => {
    const shared = window.VaporShared;
    const products = window.VAPOR_PRODUCTS || [];
    if (!shared) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const product = shared.findProductBySlug(products, slug);
    const root = document.getElementById('product-detail');
    const cart = shared.getCart();
    shared.updateCartNavUI(cart);
    shared.setupCartDropdown();
    shared.setupMobileNav();

    if (!slug || !product || !root) {
        renderNotFound(root);
        document.title = 'Product Not Found - VAPOR';
        return;
    }

    shared.updateProductPageSeo(product);
    renderProduct(product, root, cart, shared);
});

function renderNotFound(root) {
    root.innerHTML = `
        <div class="rounded-2xl bg-white p-8 sm:p-12 shadow-sm border border-gray-100 text-center">
            <h1 class="text-3xl font-bold mb-4" style="color: var(--primary);">Product not found</h1>
            <p class="text-gray-600 mb-6">This product may have been removed or the link is incorrect.</p>
            <a href="products.html" class="btn-primary inline-block text-white px-6 py-3 rounded-lg font-semibold">Browse all products</a>
        </div>
    `;
}

function renderProduct(product, root, cart, shared) {
    const features = Array.isArray(product.features) ? product.features : [];
    const categoryLabel = product.category
        ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
        : 'Product';

    root.innerHTML = `
        <nav class="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol class="flex flex-wrap items-center gap-2">
                <li><a href="index.html" class="hover:text-gray-900">Home</a></li>
                <li>/</li>
                <li><a href="products.html" class="hover:text-gray-900">Products</a></li>
                <li>/</li>
                <li><a href="products.html?category=${encodeURIComponent(product.category || '')}" class="hover:text-gray-900">${categoryLabel}</a></li>
                <li>/</li>
                <li class="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">${product.name}</li>
            </ol>
        </nav>

        <article class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 rounded-2xl bg-white p-6 sm:p-10 shadow-sm border border-gray-100">
            <div class="bg-gray-50 rounded-xl p-4 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-80 sm:h-[28rem] object-cover object-[center_32%] rounded-lg bg-gray-100">
            </div>
            <div class="min-w-0">
                <div class="flex flex-wrap items-start gap-3 mb-3">
                    <h1 class="text-3xl sm:text-4xl font-bold break-words min-w-0" style="color: var(--primary);">${product.name}</h1>
                    ${product.new ? '<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full shrink-0">New</span>' : ''}
                </div>
                <p class="text-lg text-gray-600 mb-4">${product.brand || ''}</p>
                <p class="text-gray-700 mb-6 leading-relaxed">${product.description || ''}</p>

                <div class="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div class="rounded-lg bg-gray-50 p-3">
                        <p class="text-gray-500">Price</p>
                        <p class="font-bold text-xl" style="color: var(--secondary);">$${product.price.toFixed(2)}</p>
                        ${product.originalPrice ? `<p class="text-gray-400 line-through text-sm">$${product.originalPrice.toFixed(2)}</p>` : ''}
                    </div>
                    <div class="rounded-lg bg-gray-50 p-3">
                        <p class="text-gray-500">Availability</p>
                        <p class="font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}">${product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                    </div>
                    <div class="rounded-lg bg-gray-50 p-3">
                        <p class="text-gray-500">Nicotine</p>
                        <p class="font-semibold text-gray-900">${product.nicotine || 'N/A'}</p>
                    </div>
                    <div class="rounded-lg bg-gray-50 p-3">
                        <p class="text-gray-500">Puffs</p>
                        <p class="font-semibold text-gray-900">${product.puffs ? product.puffs : 'N/A'}</p>
                    </div>
                </div>

                ${
                    features.length
                        ? `<div class="mb-8">
                    <h2 class="font-semibold text-lg mb-2" style="color: var(--primary);">Key features</h2>
                    <ul class="list-disc list-inside text-gray-600 space-y-1">
                        ${features.map((feature) => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>`
                        : ''
                }

                <div class="flex flex-col sm:flex-row gap-3">
                    <button type="button" id="product-add-to-cart" class="btn-primary flex-1 text-white py-3 px-6 rounded-lg font-semibold ${product.inStock ? '' : 'opacity-60 cursor-not-allowed'}" ${product.inStock ? '' : 'disabled'}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <a href="products.html" class="flex-1 text-center py-3 px-6 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100">Back to catalog</a>
                </div>
            </div>
        </article>
    `;

    const addBtn = document.getElementById('product-add-to-cart');
    if (addBtn && product.inStock) {
        addBtn.addEventListener('click', () => {
            shared.addToCart(cart, product, 1);
            shared.showNotification(`${product.name} added to cart!`, 'success');
        });
    }
}
