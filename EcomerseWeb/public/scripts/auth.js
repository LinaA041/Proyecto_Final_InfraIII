
function handleLogin() {
    const form = document.getElementById('login-form'); 
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = form.elements['username'].value;
        const password = form.elements['password'].value;

        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(() => window.location.href = './index.html')
        .catch(() => alert('Credenciales incorrectas'));
    });
}

function handleRegister() {
    const form = document.getElementById('register-form'); 
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("Formulario enviado");

        const username = form.elements['username'].value;
        const email = form.elements['email'].value;
        const password = form.elements['password'].value;

        console.log({ username, email, password }); 

        fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => {
            if (response.ok) {
                console.log("entre"); 
                window.location.href = './index.html';
            } else {
                return response.json().then(data => {
                    alert(data.message || 'Error en el registro');
                });
            }
        })
        .catch((error) => alert('Error de red: ' + error.message));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('login-form')) handleLogin();
    if (document.getElementById('register-form')){
        console.log("Formulario de registro encontrado");
        handleRegister();
    }
});