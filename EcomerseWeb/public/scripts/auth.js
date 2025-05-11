
function handleLogin() {
    const form = document.getElementById('login-form'); 
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = form.elements['username'].value;
        const password = form.elements['password'].value;

        fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(() => window.location.href = '/products')
        .catch(() => alert('Credenciales incorrectas'));
    });
}

function handleRegister() {
    const form = document.getElementById('register-form'); 
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = form.elements['username'].value;
        const email = form.elements['email'].value;
        const password = form.elements['password'].value;

        fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
        .then(() => window.location.href = '/products')
        .catch(() => alert('Error en el registro'));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('login-form')) handleLogin();
    if (document.getElementById('register-form')) handleRegister();
});