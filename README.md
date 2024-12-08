# Fase 2: Sistema de Autenticación

**Objetivo**:  
Implementar un sistema de autenticación utilizando Firestore y JSON Web Tokens (JWT), que permita registrar usuarios, iniciar sesión y renovar tokens.

---

## Características Implementadas

1. **Registro de usuarios (`POST /auth/register`)**:
   - Permite registrar nuevos usuarios almacenando credenciales cifradas en Firestore.
   - Devuelve un Access Token y un Refresh Token.
2. **Inicio de sesión (`POST /auth/login`)**:
   - Valida las credenciales del usuario.
   - Devuelve un Access Token y un Refresh Token.
3. **Renovación de tokens (`POST /auth/refresh-token`)**:
   - Permite obtener un nuevo Access Token utilizando un Refresh Token válido.

---

## Pasos Realizados

1. **Crear la estructura de archivos para autenticación**:
   - Carpetas: `auth/controllers/`, `auth/services/`, `auth/routes/`.
2. **Configurar Firestore para almacenar usuarios**:
   - La colección `users` almacena el correo electrónico y la contraseña cifrada.
3. **Implementar controladores para cada funcionalidad**:
   - Registro, inicio de sesión y renovación de tokens.
4. **Agregar rutas de autenticación en el servidor**:
   - Prefijo `/auth` para las rutas relacionadas con la autenticación.

---

## Cómo Usar esta Fase

### 1. Instalar Dependencias
Ejecuta:

```bash
npm install bcrypt jsonwebtoken
```

### 2. Probar el Registro de Usuarios
Realiza una solicitud POST a:
```bash
http://localhost:3000/auth/register
```

Con el siguiente cuerpo JSON:
```bash
{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Probar el Inicio de Sesión
Realiza una solicitud POST a:
```bash
http://localhost:3000/auth/login
```

```bash
{
  "email": "test@example.com",
  "password": "password123"
}
```

### 4. Probar la Renovación de Tokens
Realiza una solicitud POST a:

```bash
http://localhost:3000/auth/refresh-token
```
Con el siguiente cuerpo JSON:
```bash
{
  "refreshToken": "<your-refresh-token>"
}
```

> [!NOTE] Este archivo README.md está diseñado únicamente para la rama fase-2-autenticacion.
> 💡 Consejo: Asegúrate de probar las funcionalidades de autenticación antes de fusionar esta rama con develop.