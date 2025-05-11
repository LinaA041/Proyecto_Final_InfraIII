class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.loadCart();
        this.setupEventListeners();
        this.updateCartCount();
    }

    loadCart() {
        if (document.getElementById('cartItems')) {
            const cartItemsEl = document.getElementById('cartItems');
            cartItemsEl.innerHTML = this.items.length > 0 
                ? this.items.map(item => this.createCartItemHtml(item)).join('')
                : '<p class="empty-cart">Tu carrito está vacío</p>';

            this.updateTotals();
        }
    }

    createCartItemHtml(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </div>
                <button class="remove-btn">
                    <i class="material-icons">delete</i>
                </button>
            </div>
        `;
    }

    updateTotals() {
        if (document.getElementById('cartTotal')) {
            const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal > 50 ? 0 : 5.99; // Envío gratis sobre $50
            const total = subtotal + shipping;

            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
            document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
        }
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(el => el.textContent = count);
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.product_id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.product_id,
                name: product.name,
                price: product.price,
                quantity: quantity
            });
        }
        
        this.saveCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            this.saveCart();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.loadCart();
        this.updateCartCount();
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }

    async processCheckout() {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: this.items })
            });

            if (response.ok) {
                this.clearCart();
                alert('¡Compra realizada con éxito!');
                window.location.href = 'index.html';
            } else {
                const error = await response.json();
                alert(error.error || 'Error en el proceso de compra');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        }
    }

    setupEventListeners() {
        // Eliminar items
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-btn')) {
                const itemEl = e.target.closest('.cart-item');
                const productId = parseInt(itemEl.getAttribute('data-id'));
                this.removeItem(productId);
            }
        });

        // Actualizar cantidades
        document.addEventListener('click', (e) => {
            const quantityBtn = e.target.closest('.quantity-btn');
            if (quantityBtn) {
                const itemEl = quantityBtn.closest('.cart-item');
                const productId = parseInt(itemEl.getAttribute('data-id'));
                const quantityEl = itemEl.querySelector('.quantity-value');
                let quantity = parseInt(quantityEl.textContent);

                if (quantityBtn.classList.contains('plus')) {
                    quantity++;
                } else if (quantityBtn.classList.contains('minus')) {
                    quantity--;
                }

                this.updateQuantity(productId, quantity);
            }
        });

        // Checkout
        if (document.getElementById('checkoutBtn')) {
            document.getElementById('checkoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                if (this.items.length === 0) {
                    alert('Tu carrito está vacío');
                    return;
                }
                this.processCheckout();
            });
        }
    }
}

// Inicializar carrito
const cart = new Cart();
window.cart = cart;