// Clase para manejar la autenticación del lado del cliente
class Auth {
    static TOKEN_KEY = 'authToken';

    // Guardar token en localStorage
    static saveToken(token) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    // Obtener token de localStorage
    static getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    // Eliminar token
    static removeToken() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    // Verificar si hay sesión activa
    static isAuthenticated() {
        return this.getToken() !== null;
    }

    // Hacer petición con token
    static async fetchWithAuth(url, options = {}) {
        const token = this.getToken();
        console.log('🔑 Token actual:', token); // ← LOG 1
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        console.log('📤 Haciendo petición a:', url); // ← LOG 2
        const response = await fetch(url, {
            ...options,
            headers
        });
         console.log('📥 Respuesta recibida - Status:', response.status); // ← LOG 3
        // Si recibimos 403, redirigir a forbidden
        if (response.status === 403) {
            console.log('🚫 ERROR 403 DETECTADO - Redirigiendo a forbidden.html'); // ← LOG 4
            window.location.href = 'forbidden.html';
            throw new Error('Acceso denegado');
        }

        return response;
    }
}      