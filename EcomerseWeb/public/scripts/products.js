function addToCart(productId) {
    fetch(`/cart/add/${productId}`, { method: 'POST' })
        .then(() => alert('Producto añadido al carrito'))
        .catch(err => console.error('Error:', err));
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.product-container'); 
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    let allProducts = [];

    function renderProducts(products) {
        const grid = document.getElementById('productGrid');
        grid.innerHTML = ''; // Limpiar productos anteriores
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-card'; 
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <button class="add-btn" onclick="addToCart(${product.id})">Añadir al carrito</button>
            `;
            grid.appendChild(productDiv);
        });
    }

    fetch('http://localhost:8080/api/products')
        .then(res => res.json())
        .then(products => {
            allProducts = products;
            renderProducts(allProducts);
        });

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });
});
