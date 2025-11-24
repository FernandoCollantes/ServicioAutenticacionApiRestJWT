console.log('login.js cargado');

// Redirigir si ya está autenticado
if (Auth.isAuthenticated()) {
    console.log('Ya está autenticado - Redirigiendo a welcome');
    window.location.href = 'welcome.html';
} else {
    console.log('No autenticado - Mostrando formulario de login');
}

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar token y redirigir
            Auth.saveToken(data.token);
            window.location.href = 'welcome.html';
        } else {
            // Mostrar código de error junto al mensaje
            const errorText = data.code 
                ? `Error ${data.code}: ${data.error}`
                : data.error || 'Error al iniciar sesión';
            showError(errorText);
        }
    } catch (error) {
        showError('Error de conexión con el servidor');
        console.error('Error:', error);
    }
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}