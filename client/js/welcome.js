console.log('🟢 welcome.js cargado');

// Si no hay token, ir a forbidden en lugar de login
if (!Auth.isAuthenticated()) {
    console.log('No hay token - Redirigiendo a forbidden');
    window.location.href = 'forbidden.html';
    // Detener ejecución del resto del script
    throw new Error('No autenticado');
}

console.log('Token existe - Continuando con welcome.html');

const loadingMessage = document.getElementById('loadingMessage');
const welcomeContent = document.getElementById('welcomeContent');
const usernameSpan = document.getElementById('username');
const currentTimeSpan = document.getElementById('currentTime');
const welcomeMessageSpan = document.getElementById('welcomeMessage');
const logoutButton = document.getElementById('logoutButton');

// Cargar datos del usuario
async function loadUserData() {
    console.log('Iniciando loadUserData()');
    
    try {
        const response = await Auth.fetchWithAuth('http://localhost:3000/api/welcome');

        console.log('Respuesta exitosa, procesando datos');
        
        const data = await response.json();
        
        // Mostrar información
        usernameSpan.textContent = data.username;
        currentTimeSpan.textContent = data.currentTime;
        welcomeMessageSpan.textContent = data.message;

        // Mostrar contenido
        loadingMessage.style.display = 'none';
        welcomeContent.style.display = 'block';
        
    } catch (error) {
        console.log('Error capturado en loadUserData()');
        console.log('Tipo de error:', error.message);
        
        if (error.message === 'Acceso denegado') {
            console.log('Error es "Acceso denegado" - Ya redirigido a forbidden');
            return;
        }
        
        //ir a forbidden 
        console.log('Otro tipo de error - Redirigiendo a forbidden');
        Auth.removeToken();
        window.location.href = 'forbidden.html';
    }
}

// Cerrar sesión
logoutButton.addEventListener('click', async () => {
    console.log('Cerrando sesión...');
    
    try {
        await Auth.fetchWithAuth('http://localhost:3000/api/logout', {
            method: 'POST'
        });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    } finally {
        Auth.removeToken();
        window.location.href = 'index.html';
    }
});

// Cargar datos al iniciar
console.log('Llamando a loadUserData()');
loadUserData();

//