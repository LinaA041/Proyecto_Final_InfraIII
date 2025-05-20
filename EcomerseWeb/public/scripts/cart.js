let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
  window.location.href = './login.html';
}else{
    userJSON=JSON.parse(userJSON);
}

function updateCart() {
    fetch(`http://localhost:8080/api/cart/${userJSON.id}`,{
        method: 'GET'
    })
        .then(res => res.json())
        .then(cart => {
            const tbody = document.getElementById('cartItems');
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

            document.getElementById('cartTotal').textContent = total.toFixed(2); // ID en tu HTML
        });
}

function removeFromCart(itemId) {
    fetch(`http://localhost:8080/remove/${userJSON.id}/${itemId}`, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(text) });
            }
            return updateCart();
        })
        .catch(err => console.error('Error al eliminar el ítem del carrito:', err.message));
}


updateCart();


const exitButton = document.getElementById('logoutBtn');

exitButton.addEventListener('click', exit);


function exit(){
    window.location.href = "./index.html";
    localStorage.clear();
}

const processPay = document.getElementById('checkoutBtn');

processPay.addEventListener('click', process);

function process() {
    const totalText = document.getElementById('cartTotal').textContent.trim();
    const totalNumber = parseFloat(totalText.replace('$', ''));

    if (isNaN(totalNumber) || totalNumber === 0) {
        alert("Añada algún producto al carro");
    } else {
        window.location.href = "./checkout.html";
    }
}
