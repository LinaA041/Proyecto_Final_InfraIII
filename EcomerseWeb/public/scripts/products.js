document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Cargar productos desde el backend
        const response = await fetch('/api/products');
        const products = await response.json();
        
        // Renderizar productos
        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.product_id}">
                        <i class="material-icons">add_shopping_cart</i> Agregar
                    </button>
                </div>
            </div>
        `).join('');

        // Configurar eventos para agregar al carrito
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.getAttribute('data-id'));
                const product = products.find(p => p.product_id === productId);
                if (product) {
                    window.cart.addItem(product);
                    showToast(`${product.name} agregado al carrito`);
                }
            });
        });

    } catch (error) {
        console.error('Error al cargar productos:', error);
        showError('No se pudieron cargar los productos');
    }

    // Mostrar notificación toast
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // Mostrar error
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
    }
});