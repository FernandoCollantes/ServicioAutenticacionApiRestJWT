const express = require('express');
const router = express.Router();

// Simular base de datos de usuarios
const usuarios = [
    { username: "admin", password: "1234" },
    { username: "user", password: "abcd" }
];

// Almacén temporal de tokens (en producción usarías una BD)
const tokens = {};

// POST /api/login - Autenticación
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validar que se envían credenciales
    if (!username || !password) {
        return res.status(400).json({ 
            error: 'Username y password son requeridos',
            code: 400
        });
    }

    // Buscar usuario
    const usuario = usuarios.find(
        u => u.username === username && u.password === password
    );

    if (usuario) {
        // Generar token (simulado con base64)
        const token = Buffer.from(`${username}-${Date.now()}`).toString('base64');
        
        // Guardar token con información del usuario
        tokens[token] = {
            username: usuario.username,
            timestamp: Date.now()
        };

        res.json({ 
            success: true,
            token: token,
            username: usuario.username
        });
    } else {
        //  Incluir código de error en la respuesta
        res.status(401).json({ 
            error: 'Credenciales inválidas',
            code: 401
        });
    }
});

// GET /api/welcome - Endpoint protegido
router.get('/welcome', (req, res) => {
    // Obtener token de la cabecera Authorization
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(403).json({ 
            error: 'No se proporcionó token de autenticación',
            code: 403
        });
    }

    // Extraer el token (formato: "Bearer <token>")
    const token = authHeader.split(' ')[1];

    // Validar token
    if (!tokens[token]) {
        return res.status(403).json({ 
            error: 'Token inválido o expirado',
            code: 403
        });
    }

    // Obtener datos del usuario
    const userData = tokens[token];
    const now = new Date();

    res.json({
        success: true,
        username: userData.username,
        currentTime: now.toLocaleString('es-ES'),
        message: '¡Bienvenido a tu panel protegido!'
    });
});

// POST /api/logout - Cerrar sesión
router.post('/logout', (req, res) => {
    const authHeader = req.headers['authorization'];
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        delete tokens[token];
    }

    res.json({ 
        success: true,
        message: 'Sesión cerrada correctamente' 
    });
});

module.exports = router;