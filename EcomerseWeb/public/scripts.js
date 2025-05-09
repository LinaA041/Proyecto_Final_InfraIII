document.addEventListener('DOMContentLoaded', function() {
    // Datos de productos simulados
    const products = [
        {
            id: 1,
            name: "Smartphone Premium 128GB",
            price: 899.99,
            description: "Último modelo con cámara de alta resolución"
        },
        {
            id: 2,
            name: "Laptop Ultradelgada",
            price: 1299.99,
            description: "Procesador de última generación y 16GB RAM"
        },
        {
            id: 3,
            name: "Auriculares Inalámbricos",
            price: 149.99,
            description: "Cancelación de ruido y 20h de batería"
        }
    ];

    const productGrid = document.querySelector('.product-grid');
    const cartCount = document.querySelector('.cart-count');
    let cart = [];

    // Renderizar productos
    function renderProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-info">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <p>${product.description}</p>
                    <button class="buy-btn" data-id="${product.id}">Agregar al carrito</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Actualizar carrito
    function updateCart() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Eventos
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('buy-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            updateCart();
            alert(`${product.name} agregado al carrito`);
        }
    });

    // Inicializar
    renderProducts();
});