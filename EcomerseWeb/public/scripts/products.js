
function addToCart(productId) {
    fetch(`/cart/add/${productId}`, { method: 'POST' })
        .then(() => alert('Producto añadido al carrito'))
        .catch(err => console.error('Error:', err));
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(res => res.json())
        .then(products => {
            const container = document.querySelector('.product-container'); 
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product-card'; 
                productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price}</p>
                    <button class="add-btn" onclick="addToCart(${product.id})">Añadir al carrito</button>
                `;
                container.appendChild(productDiv);
            });
        });
});