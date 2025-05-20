
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
    .then(response => {
        if (!response.ok) {
            // Si la respuesta no es OK, lanza un error con el mensaje del backend
            return response.json().then(data => {
                throw new Error(data.message || 'Error en el login');
            });
        }
        // Si todo está bien, continúa con la conversión del cuerpo
        return response.json();
    })
    .then(data => {
        // Aquí tienes al usuario (data) y puedes guardarlo
        const user = JSON.stringify(data);
        localStorage.setItem('user', user);
        window.location.href = './index.html';
    })
    .catch(error => {
        // Cae aquí si hubo algún problema
        alert(error.message || 'Credenciales incorrectas');
    });

    
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

        fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => {
            if (response.ok) {
                let data = response.json();
                let user = JSON.stringify(data);
                window.location.href = './index.html';
                window.localStorage.setItem('user',user);
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
