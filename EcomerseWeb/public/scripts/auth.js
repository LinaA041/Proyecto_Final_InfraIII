document.addEventListener('DOMContentLoaded', () => {
    // Manejar registro
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                email: document.getElementById('email').value
            };

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Registro exitoso!');
                    window.location.href = 'login.html';
                } else {
                    const error = await response.json();
                    alert(error.error || 'Error en el registro');
                }
            } catch (error) {
                alert('Error de conexión');
            }
        });
    }

    // Manejar login
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const credentials = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            };

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                });

                if (response.ok) {
                    window.location.href = 'index.html';
                } else {
                    alert('Credenciales incorrectas');
                }
            } catch (error) {
                alert('Error de conexión');
            }
        });
    }
});