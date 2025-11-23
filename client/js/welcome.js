console.log('🟢 welcome.js cargado'); // ← LOG 1
// Verificar autenticación
if (!Auth.isAuthenticated()) {
     console.log('❌ No hay token - Redirigiendo a login'); // ← LOG 2
    window.location.href = 'index.html';
}
console.log('✅ Token existe - Continuando con welcome.html'); // ← LOG 3
const loadingMessage = document.getElementById('loadingMessage');
const welcomeContent = document.getElementById('welcomeContent');
const usernameSpan = document.getElementById('username');
const currentTimeSpan = document.getElementById('currentTime');
const welcomeMessageSpan = document.getElementById('welcomeMessage');
const logoutButton = document.getElementById('logoutButton');

// Cargar datos del usuario
async function loadUserData() {
    console.log('🔄 Iniciando loadUserData()'); // ← LOG 4
    try {
        const response = await Auth.fetchWithAuth('http://localhost:3000/api/welcome');
        console.log('✅ Respuesta exitosa, procesando datos'); // ← LOG 5
        // Si Auth.fetchWithAuth() no lanzó error, significa que response.ok es true
        const data = await response.json();
        
        // Mostrar información
        usernameSpan.textContent = data.username;
        currentTimeSpan.textContent = data.currentTime;
        welcomeMessageSpan.textContent = data.message;

        // Mostrar contenido
        loadingMessage.style.display = 'none';
        welcomeContent.style.display = 'block';
        
    } catch (error) {
        console.log('❌ Error capturado en loadUserData()'); // ← LOG 6
        console.log('❌ Tipo de error:', error.message); // ← LOG 7
        // Si llegamos aquí con error "Acceso denegado", 
        // Auth.fetchWithAuth() YA redirigió a forbidden.html
        // Solo manejamos otros errores (red, servidor caído, etc)
        if (error.message === 'Acceso denegado') {
            console.log('🚫 Error es "Acceso denegado" - No hacer nada más'); // ← LOG 8
            // No hacer nada, la redirección ya ocurrió
            return;
        }
        
        // Otros errores: ir a login
        console.log('⚠️ Otro tipo de error - Redirigiendo a login'); // ← LOG 9
        console.error('Error:', error);
        Auth.removeToken();
        window.location.href = 'index.html';
    }
}

// Cerrar sesión
logoutButton.addEventListener('click', async () => {
    console.log('🚪 Cerrando sesión...'); // ← LOG 10
    try {
        await Auth.fetchWithAuth('http://localhost:3000/api/logout', {
            method: 'POST'
        });
    } catch (error) {
        // Si hay error, igual cerramos sesión localmente
        console.error('Error al cerrar sesión:', error);
    } finally {
        Auth.removeToken();
        window.location.href = 'index.html';
    }
});
console.log('🚀 Llamando a loadUserData()'); // ← LOG 11
// Cargar datos al iniciar
loadUserData();
// === FUNCIÓN DE PRUEBA ===
// Esta función simula un token inválido SIN modificar manualmente localStorage
function probarTokenInvalido() {
    console.log('🧪 PRUEBA: Invalidando token...');
    
    // Cambiar el token por uno falso
    Auth.saveToken('token-falso-prueba-12345');
    
    console.log('🔄 Recargando página con token inválido...');
    
    // Recargar la página
    setTimeout(() => {
        window.location.reload();
    }, 500);
}

// Hacer la función global para que el botón pueda llamarla
window.probarTokenInvalido = probarTokenInvalido;