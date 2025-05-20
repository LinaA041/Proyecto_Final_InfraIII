let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
  window.location.href = './login.html';
}else{
    userJSON=JSON.parse(userJSON);
}


function addToCart(productId) {
    fetch(`/api/cart/add/${userJSON.id}/${productId}`, {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            return response.json().then(data => {
                alert(data.message); // Aquí accedes correctamente al mensaje
            });
        } else {
            return response.json().then(data => {
                alert(data.message);
            });
        }
    })
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
                <button class="add-to-cart" onclick="addToCart(${product.id})">Añadir al carrito</button>
            `;
            grid.appendChild(productDiv);
        });
    }

    fetch('/api/products')
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


const exitButton = document.getElementById('logoutBtn');

exitButton.addEventListener('click', exit);


function exit(){
    window.location.href = "./index.html";
    localStorage.clear();
}