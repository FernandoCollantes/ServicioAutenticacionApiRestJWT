![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
# 🔐 Sistema de Autenticación con API RESTful

Sistema de autenticación web completo que implementa una API RESTful utilizando Node.js, Express y autenticación basada en tokens. Proyecto desarrollado como parte del módulo DWEC (Desarrollo Web en Entorno Cliente).

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints de la API](#endpoints-de-la-api)
- [Flujo de Autenticación](#flujo-de-autenticación)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Seguridad](#seguridad)
- [Mejoras Futuras](#mejoras-futuras)
- [Autor](#autor)

---

## 📖 Descripción

Este proyecto es una aplicación web que implementa un sistema completo de autenticación mediante una API RESTful. Incluye pantallas de login, bienvenida y manejo de errores de permisos, utilizando tokens para mantener las sesiones de usuario.

### Objetivos del Proyecto

- Implementar un sistema de autenticación basado en tokens
- Crear una API RESTful con Node.js y Express
- Manejar sesiones del lado del cliente con localStorage
- Proteger rutas mediante validación de tokens
- Gestionar diferentes estados de autenticación (login, autenticado, sin permisos)

---

## ✨ Características

### Frontend (Cliente)
- ✅ **Pantalla de Login**: Formulario de autenticación con validación
- ✅ **Pantalla de Bienvenida**: Panel personalizado con información del usuario
- ✅ **Pantalla de Error 403**: Página de acceso denegado
- ✅ **Gestión de Sesiones**: Uso de localStorage para persistencia
- ✅ **Redirecciones Automáticas**: Basadas en el estado de autenticación
- ✅ **Interfaz Responsive**: Diseño adaptable a diferentes dispositivos

### Backend (Servidor)
- ✅ **API RESTful**: Endpoints organizados y estructurados
- ✅ **Autenticación por Token**: Generación y validación de tokens
- ✅ **Validación de Credenciales**: Verificación contra base de datos simulada
- ✅ **Manejo de Errores HTTP**: Códigos de estado apropiados (401, 403)
- ✅ **CORS Habilitado**: Configuración para peticiones cross-origin
- ✅ **Middleware de Autenticación**: Protección de rutas sensibles

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** (v14+): Entorno de ejecución de JavaScript
- **Express** (v4.18+): Framework web minimalista
- **CORS**: Middleware para habilitar peticiones cross-origin

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos con gradientes y animaciones
- **JavaScript (ES6+)**: Lógica del cliente
- **Fetch API**: Peticiones HTTP asíncronas
- **localStorage**: Almacenamiento persistente del lado del cliente

### Desarrollo
- **Nodemon**: Reinicio automático del servidor durante desarrollo
- **Git**: Control de versiones
## 🚀 Instalación

### Prerrequisitos

- **Node.js** (versión 14 o superior)
- **npm** (incluido con Node.js)
- Un navegador web moderno

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
   git clone 
   cd ServicioAutenticacionApiRestJWT
```

2. **Instalar dependencias**
```bash
   npm install
```

3. **Verificar la instalación**
```bash
   npm list
```

   Deberías ver:
```
   ├── express@4.18.x
   ├── cors@2.8.x
   └── nodemon@3.0.x (devDependencies)
```

---

## 💻 Uso

### Iniciar el Servidor

#### Modo Desarrollo (con reinicio automático)
```bash
npm run dev
```

#### Modo Producción
```bash
npm start
```

El servidor se iniciará en: **`http://localhost:3000`**

### Acceder a la Aplicación

1. Abre tu navegador
2. Ve a: `http://localhost:3000`
3. Verás la pantalla de login

### Credenciales de Prueba
```
👤 Usuario: admin
🔑 Contraseña: 1234

👤 Usuario: user
🔑 Contraseña: abcd
```

---

## 🔌 Endpoints de la API

### 1. POST `/api/login`
**Descripción**: Autentica al usuario y devuelve un token

**Request Body**:
```json
{
  "username": "admin",
  "password": "1234"
}
```

**Respuesta Exitosa (200)**:
```json
{
  "success": true,
  "token": "YWRtaW4tMTcwMDAwMDAwMDAwMA==",
  "username": "admin"
}
```

**Respuesta Error (401 Unauthorized)**:
```json
{
  "error": "Credenciales inválidas"
}
```

---

### 2. GET `/api/welcome`
**Descripción**: Obtiene información del usuario autenticado (ruta protegida)

**Headers Requeridos**:
```
Authorization: Bearer <token>
```

**Respuesta Exitosa (200)**:
```json
{
  "success": true,
  "username": "admin",
  "currentTime": "23/11/2024, 12:30:45",
  "message": "¡Bienvenido a tu panel protegido!"
}
```

**Respuesta Error (403 Forbidden)**:
```json
{
  "error": "Token inválido o expirado"
}
```

---

### 3. POST `/api/logout`
**Descripción**: Cierra la sesión del usuario

**Headers Requeridos**:
```
Authorization: Bearer <token>
```

**Respuesta Exitosa (200)**:
```json
{
  "success": true,
  "message": "Sesión cerrada correctamente"
}
```

---

## 🔄 Flujo de Autenticación

### 1. Login del Usuario
```
Usuario ingresa credenciales
        ↓
JavaScript envía POST a /api/login
        ↓
Servidor valida credenciales
        ↓
Servidor genera token único
        ↓
Servidor responde con token
        ↓
Cliente guarda token en localStorage
        ↓
Cliente redirige a welcome.html
```

### 2. Acceso a Ruta Protegida
```
Cliente lee token de localStorage
        ↓
Cliente envía GET a /api/welcome
Headers: Authorization: Bearer <token>
        ↓
Servidor valida token
        ↓
¿Token válido?
    ├─ SÍ → Responde con datos (200)
    └─ NO → Responde error (403)
        ↓
    Cliente redirige a forbidden.html
```

### 3. Cierre de Sesión
```
Usuario hace clic en "Cerrar Sesión"
        ↓
Cliente envía POST a /api/logout
        ↓
Servidor elimina token de memoria
        ↓
Cliente elimina token de localStorage
        ↓
Cliente redirige a index.html (login)
```

---

## 🔒 Seguridad

### Implementaciones de Seguridad Actuales

- ✅ **Validación de Credenciales**: Verificación en servidor
- ✅ **Tokens de Sesión**: Autenticación basada en tokens
- ✅ **Códigos HTTP Apropiados**: 401 (No autenticado), 403 (Sin permisos)
- ✅ **CORS Configurado**: Control de orígenes permitidos
- ✅ **Validación de Headers**: Verificación de token en cada petición protegida

### ⚠️ Limitaciones de Seguridad (Para Entorno de Producción)

> **IMPORTANTE**: Este proyecto es educativo. NO está listo para producción sin las siguientes mejoras:

1. **Contraseñas en texto plano**
   - ❌ Actualmente: Contraseñas almacenadas sin cifrar
   - ✅ Producción: Usar **bcrypt** para hashear contraseñas

2. **Tokens simples en Base64**
   - ❌ Actualmente: Tokens generados con `base64_encode`
   - ✅ Producción: Usar **JWT** (JSON Web Tokens) con firma criptográfica

3. **Tokens sin expiración**
   - ❌ Actualmente: Tokens válidos indefinidamente
   - ✅ Producción: Implementar expiración automática

4. **Almacenamiento en memoria**
   - ❌ Actualmente: Tokens en objeto JavaScript (se pierden al reiniciar)
   - ✅ Producción: Base de datos (Redis, MongoDB, PostgreSQL)

5. **Sin HTTPS**
   - ❌ Actualmente: HTTP sin cifrar
   - ✅ Producción: HTTPS obligatorio

---

## 🎯 Mejoras Futuras

### Prioridad Alta
- [ ] Implementar **JWT** (JSON Web Tokens)
- [ ] Hashear contraseñas con **bcrypt**
- [ ] Agregar expiración de tokens (refresh tokens)
- [ ] Conectar a base de datos real (MySQL/MongoDB)

### Prioridad Media
- [ ] Sistema de registro de usuarios
- [ ] Recuperación de contraseña
- [ ] Perfiles de usuario
- [ ] Roles y permisos (admin, user, guest)

### Prioridad Baja
- [ ] Autenticación con OAuth (Google, GitHub)
- [ ] Autenticación de dos factores (2FA)
- [ ] Rate limiting (límite de intentos de login)
- [ ] Logs de auditoría

---

## 🧪 Pruebas

### Caso de Prueba 1: Login Exitoso
1. Ir a `http://localhost:3000`
2. Ingresar: `admin` / `1234`
3. **Resultado esperado**: Redirigir a `welcome.html` con datos del usuario

### Caso de Prueba 2: Login Fallido
1. Ir a `http://localhost:3000`
2. Ingresar credenciales incorrectas
3. **Resultado esperado**: Mensaje de error "Credenciales inválidas"

### Caso de Prueba 3: Acceso Sin Autenticación
1. Ir directamente a `http://localhost:3000/welcome.html` (sin hacer login)
2. **Resultado esperado**: Redirigir automáticamente a `index.html`

### Caso de Prueba 4: Token Inválido
1. Hacer login correctamente
2. Abrir DevTools → Application → Local Storage
3. Modificar el valor de `authToken`
4. Recargar `welcome.html`
5. **Resultado esperado**: Redirigir a `forbidden.html`

### Caso de Prueba 5: Cerrar Sesión
1. Hacer login correctamente
2. Hacer clic en "Cerrar Sesión"
3. **Resultado esperado**: 
   - Redirigir a `index.html`
   - Token eliminado de localStorage
   - No poder acceder a `welcome.html` sin volver a hacer login

---

## 🐛 Solución de Problemas

### Error: "Cannot GET /api/login"
**Causa**: El servidor no está corriendo
**Solución**: Ejecutar `npm run dev`

### Error: "CORS policy" en consola
**Causa**: CORS no configurado correctamente
**Solución**: Verificar que `app.use(cors())` esté en `server.js`

### Los cambios en JavaScript no se reflejan
**Causa**: Caché del navegador
**Solución**: 
- Hacer hard refresh: `Ctrl + Shift + R` (Windows/Linux) o `Cmd + Shift + R` (Mac)
- O limpiar caché: DevTools → Application → Clear storage

### El token no persiste al cerrar el navegador
**Causa**: Esto es comportamiento esperado de `localStorage`
**Solución**: Si quieres sesiones temporales, usa `sessionStorage` en lugar de `localStorage`

---

## 📚 Recursos Adicionales

### Documentación
- [Express.js](https://expressjs.com/)
- [MDN - Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [MDN - localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)

### Tutoriales Relacionados
- [JWT Authentication Tutorial](https://jwt.io/introduction)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

---

## 👨‍💻 Autor

**Fernando** - Estudiante de DAW (Desarrollo de Aplicaciones Web)
- Centro: Campus Cámara de Comercio de Sevilla
- Curso: 2º DAW
- Módulo: DWEC (Desarrollo Web en Entorno Cliente)
- Profesor: Carlos Basulto Pardo

---

## 📄 Licencia

Este proyecto es educativo y fue desarrollado como parte del currículo académico del módulo DWEC.

---

## 🙏 Agradecimientos

- Profesor Carlos Basulto Pardo por la guía y especificaciones del proyecto
- Compañeros de clase por las pruebas y feedback
- Documentación oficial de Node.js y Express

---

## 📝 Notas de Versión

### v1.0.0 (Noviembre 2024)
- ✅ Implementación inicial del sistema de autenticación
- ✅ API RESTful con 3 endpoints funcionales
- ✅ Frontend con 3 pantallas (login, welcome, forbidden)
- ✅ Manejo de tokens con localStorage
- ✅ Validación de credenciales
- ✅ Redirecciones automáticas basadas en estado de autenticación

---

## 📞 Contacto

Para preguntas o sugerencias sobre este proyecto, contactar a través de los canales del curso.

---

**⭐ Si este proyecto te resultó útil, considera darle una estrella en GitHub**