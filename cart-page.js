const checkoutState = {
    promoRate: 0,
    promoCode: '',
    paymentMethod: 'card'
};

document.addEventListener('DOMContentLoaded', () => {
    const shared = window.VaporShared;
    const products = window.VAPOR_PRODUCTS || [];
    const cart = shared.getCart();

    shared.applyFuturisticTheme();
    shared.updateCartNavUI(cart);
    shared.setupMobileNav();
    renderCart(cart, shared);
    renderRecommended(products, cart, shared);
    bindPromo(cart, shared);
    bindPaymentModes(shared);
    bindCheckout(cart, shared);
    shared.setupScrollAnimations();
    shared.setupHoverAnimations();
    shared.setupJellyAnimations();
});

function renderCart(cart, shared) {
    const cartContent = document.getElementById('cart-content');
    if (!cartContent) return;

    if (cart.items.length === 0) {
        const empty = document.getElementById('empty-cart-template');
        if (empty) cartContent.innerHTML = empty.innerHTML;
        updateSummary(cart);
        return;
    }

    cartContent.innerHTML = '';
    cart.items.forEach((item) => {
        const wrap = document.createElement('div');
        wrap.className = 'cart-item p-4 rounded-lg bg-white';
        wrap.innerHTML = `
            <div class="flex items-center gap-4">
                <img class="w-20 h-20 object-cover rounded-lg" src="${item.image}" alt="${item.name}">
                <div class="flex-1">
                    <h3 class="font-semibold text-lg mb-1" style="color: var(--primary);">${item.name}</h3>
                    <p class="text-sm text-gray-600 mb-2">${item.brand}</p>
                    <div class="flex items-center gap-2">
                        <button class="quantity-btn decrease-btn">-</button>
                        <input type="number" class="quantity-input" min="1" max="10" value="${item.quantity}">
                        <button class="quantity-btn increase-btn">+</button>
                        <button class="remove-item text-red-500 hover:text-red-700 text-sm ml-4">Remove</button>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-bold text-lg" style="color: var(--secondary);">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            </div>
        `;

        wrap.querySelector('.decrease-btn').addEventListener('click', () => {
            shared.updateCartQuantity(cart, item.id, item.quantity - 1);
            rerender(cart, shared);
        });

        wrap.querySelector('.increase-btn').addEventListener('click', () => {
            shared.updateCartQuantity(cart, item.id, item.quantity + 1);
            rerender(cart, shared);
        });

        wrap.querySelector('.quantity-input').addEventListener('change', (event) => {
            const value = parseInt(event.target.value, 10) || 1;
            shared.updateCartQuantity(cart, item.id, value);
            rerender(cart, shared);
        });

        wrap.querySelector('.remove-item').addEventListener('click', () => {
            shared.removeFromCart(cart, item.id);
            shared.showNotification('Item removed from cart', 'info');
            rerender(cart, shared);
        });

        cartContent.appendChild(wrap);
    });

    updateSummary(cart);
    shared.animateStagger(Array.from(cartContent.children));
    shared.setupHoverAnimations(cartContent);
    shared.setupScrollAnimations(cartContent);
    shared.setupJellyAnimations(cartContent);
}

function rerender(cart, shared) {
    shared.recalcCart(cart);
    shared.saveCart(cart);
    shared.updateCartNavUI(cart);
    renderCart(cart, shared);
}

function calculateDiscount(cart) {
    return cart.total * checkoutState.promoRate;
}

function updateSummary(cart) {
    const subtotal = cart.total;
    const discount = calculateDiscount(cart);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax - discount;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    const discountRow = document.getElementById('discount-row');
    const discountEl = document.getElementById('discount');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

    if (discount > 0 && discountRow && discountEl) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-$${discount.toFixed(2)}`;
    } else if (discountRow) {
        discountRow.style.display = 'none';
    }
}

function bindPromo(cart, shared) {
    const btn = document.getElementById('apply-promo');
    const input = document.getElementById('promo-code');
    if (!btn || !input) return;
    const codes = { vapor10: 0.1, welcome20: 0.2, save15: 0.15 };

    btn.addEventListener('click', () => {
        const code = input.value.trim().toLowerCase();
        if (!codes[code]) {
            shared.showNotification('Invalid promo code', 'error');
            return;
        }
        checkoutState.promoRate = codes[code];
        checkoutState.promoCode = code;
        updateSummary(cart);
        shared.showNotification(`Promo code applied! ${(codes[code] * 100).toFixed(0)}% off`, 'success');
        input.value = '';
    });
}

function bindPaymentModes(shared) {
    const modeButtons = document.querySelectorAll('[data-method]');
    const cardPanel = document.getElementById('card-payment-panel');
    const paypalPanel = document.getElementById('paypal-payment-panel');
    const modeLabel = document.getElementById('payment-mode-label');

    if (!modeButtons.length || !modeLabel) return;

    const applyMode = (method) => {
        checkoutState.paymentMethod = method;

        modeButtons.forEach((button) => {
            button.classList.toggle('active', button.dataset.method === method);
        });

        if (cardPanel) cardPanel.classList.toggle('hidden', method !== 'card');
        if (paypalPanel) paypalPanel.classList.toggle('hidden', method !== 'paypal');

        const labelMap = {
            card: 'Card',
            paypal: 'PayPal',
            applepay: 'Apple Pay',
            googlepay: 'Google Pay'
        };
        modeLabel.textContent = `Current method: ${labelMap[method] || 'Card'}`;
    };

    modeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            applyMode(button.dataset.method || 'card');
            shared.showNotification(`Payment mode: ${button.textContent.trim()}`, 'info');
        });
    });

    applyMode(checkoutState.paymentMethod);
}

function validateCardForm() {
    const holder = (document.getElementById('card-holder')?.value || '').trim();
    const rawNumber = (document.getElementById('card-number')?.value || '').replace(/\s+/g, '');
    const expiry = (document.getElementById('card-expiry')?.value || '').trim();
    const cvv = (document.getElementById('card-cvv')?.value || '').trim();

    if (holder.length < 3) {
        return { ok: false, message: 'Please enter a valid card holder name.' };
    }

    if (!/^\d{16}$/.test(rawNumber)) {
        return { ok: false, message: 'Card number must contain 16 digits.' };
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        return { ok: false, message: 'Expiry must follow MM/YY format.' };
    }

    if (!/^\d{3,4}$/.test(cvv)) {
        return { ok: false, message: 'CVV must contain 3 or 4 digits.' };
    }

    return { ok: true };
}

function validatePaypalForm() {
    const email = (document.getElementById('paypal-email')?.value || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { ok: false, message: 'Please enter a valid PayPal email.' };
    }
    return { ok: true };
}

function validatePaymentMode() {
    if (checkoutState.paymentMethod === 'card') return validateCardForm();
    if (checkoutState.paymentMethod === 'paypal') return validatePaypalForm();
    return { ok: true };
}

function bindCheckout(cart, shared) {
    const checkout = document.getElementById('checkout-now');
    const reserve = document.getElementById('reserve-items');

    if (checkout) {
        checkout.addEventListener('click', () => {
            if (!cart.items.length) {
                shared.showNotification('Your cart is empty!', 'error');
                return;
            }

            const paymentValidation = validatePaymentMode();
            if (!paymentValidation.ok) {
                shared.showNotification(paymentValidation.message, 'error');
                return;
            }

            const totalLabel = document.getElementById('total')?.textContent || '$0.00';
            const paymentLabels = {
                card: 'card',
                paypal: 'PayPal',
                applepay: 'Apple Pay',
                googlepay: 'Google Pay'
            };
            shared.showNotification(`Payment approved via ${paymentLabels[checkoutState.paymentMethod]} (${totalLabel})`, 'success');

            setTimeout(() => {
                cart.items = [];
                shared.recalcCart(cart);
                shared.saveCart(cart);
                shared.updateCartNavUI(cart);
                renderCart(cart, shared);
                shared.showNotification('Order placed successfully! Thank you.', 'success');
            }, 700);
        });
    }

    if (reserve) {
        reserve.addEventListener('click', () => {
            if (!cart.items.length) {
                shared.showNotification('Your cart is empty!', 'error');
                return;
            }
            shared.showNotification('Items reserved for 24 hours!', 'success');
        });
    }
}

function renderRecommended(products, cart, shared) {
    const container = document.getElementById('recommended-products');
    if (!container) return;
    container.innerHTML = '';
    products.filter((p) => p.popular).slice(0, 4).forEach((product) => {
        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-lg overflow-hidden shadow-lg';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover">
            <div class="p-4">
                <h3 class="font-semibold text-base mb-1">${product.name}</h3>
                <p class="text-sm text-gray-600 mb-3">${product.brand}</p>
                <div class="flex items-center justify-between">
                    <span class="font-bold" style="color: var(--secondary);">$${product.price.toFixed(2)}</span>
                    <button class="btn-primary text-white text-sm px-3 py-1 rounded">Add</button>
                </div>
            </div>
        `;
        const add = card.querySelector('button');
        add.addEventListener('click', () => {
            shared.addToCart(cart, product, 1);
            shared.showNotification(`${product.name} added to cart!`, 'success');
            rerender(cart, shared);
        });
        container.appendChild(card);
    });
    shared.animateStagger(Array.from(container.children));
    shared.setupHoverAnimations(container);
    shared.setupScrollAnimations(container);
    shared.setupJellyAnimations(container);
}
