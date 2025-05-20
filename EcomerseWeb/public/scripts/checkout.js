let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
  window.location.href = './login.html';
}else{
    userJSON=JSON.parse(userJSON);
}


document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkoutForm');
    const btnConfirm = document.querySelector('.btn-confirm');

    checkoutForm.addEventListener('input', function() {
        const allInputs = Array.from(checkoutForm.querySelectorAll('input[required], textarea[required]'));
        const allValid = allInputs.every(input => input.value.trim() !== '');
        btnConfirm.disabled = !allValid;
    });

    checkoutForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        btnConfirm.disabled = true;
        btnConfirm.textContent = 'Procesando...';

        try {
            const orderData = {
                shipping: {
                    fullName: document.getElementById('fullName').value.trim(),
                    address: document.getElementById('address').value.trim(),
                    city: document.getElementById('city').value.trim()
                },
                paymentMethod: document.querySelector('input[name="payment"]:checked').value
            };

            const response = await fetch(`http://localhost:8080/api/order/create/${userJSON.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('¡Compra realizada con éxito!');
                window.location.href = `./index.html`;
            } else {
                const error = await response.json();
                alert(error.message || 'Error al procesar la orden');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        } finally {
            btnConfirm.disabled = false;
            btnConfirm.textContent = 'Confirmar Compra';
        }
    });

    function validateForm() {
        const fullName = document.getElementById('fullName').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();

        if (!fullName || !address || !city) {
            alert('Por favor completa todos los campos de envío');
            return false;
        }

        const paymentMethod = document.querySelector('input[name="payment"]:checked');
        if (!paymentMethod) {
            alert('Por favor selecciona un método de pago');
            return false;
        }
        const methodValue = paymentMethod.value;

        if (methodValue === 'credit' || methodValue === 'debit') {
            const cardNumber = document.getElementById('cardNumber').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;

            if (cardNumber.length < 13 || cardNumber.length > 16) {
                alert('Número de tarjeta inválido (debe tener 13-16 dígitos)');
                return false;
            }

            if (!/^[0-9]{3,4}$/.test(cvv)) {
                alert('CVV inválido (debe tener 3-4 dígitos)');
                return false;
            }
        }

        return true;
    }
});

const exitButton = document.getElementById('logoutBtn');

exitButton.addEventListener('click', exit);


function exit(){
    window.location.href = "./index.html";
    localStorage.clear();
}