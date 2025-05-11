
function updateCart() {
    fetch('/api/cart')
        .then(res => res.json())
        .then(cart => {
            const tbody = document.querySelector('#cart-table tbody'); 
            tbody.innerHTML = '';
            let total = 0;

            cart.items.forEach(item => {
                const subtotal = item.price * item.quantity;
                total += subtotal;
                tbody.innerHTML += `
                    <tr>
                        <td>${item.name}</td>
                        <td>$${item.price}</td>
                        <td>${item.quantity}</td>
                        <td>$${subtotal.toFixed(2)}</td>
                        <td><button class="remove-btn" onclick="removeFromCart(${item.id})">X</button></td>
                    </tr>
                `;
            });

            document.getElementById('total-amount').textContent = total.toFixed(2); // ID en tu HTML
        });
}

function removeFromCart(itemId) {
    fetch(`/cart/remove/${itemId}`, { method: 'DELETE' })
        .then(() => updateCart())
        .catch(err => console.error('Error:', err));
}

function checkout() {
    fetch('/orders/create', { method: 'POST' })
        .then(() => {
            alert('Compra realizada con éxito');
            updateCart();
        })
        .catch(err => console.error('Error:', err));
}

// Inicializar
updateCart();