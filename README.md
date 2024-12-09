# Fase 2 - Autenticación y Autorización (DDD)

Implementación de autenticación y autorización siguiendo principios de **DDD (Domain-Driven Design)** y **Clean Architecture**. Esta fase incluye registro, inicio de sesión y manejo de tokens.

## Funcionalidades Implementadas

1. **Registro de Usuarios (`/auth/register`):** Registro de usuarios con validación de email único, contraseña segura y rol.
2. **Inicio de Sesión (`/auth/login`):** Autenticación de usuarios con generación de tokens.
3. **Renovación de Token (`/auth/refresh-token`):** Generación de un nuevo `accessToken` a partir de un `refreshToken`.

## Estructura Básica de Archivos

### Dominio
- Entidades: `user.entity.ts`, `token.entity.ts`.
- Value Objects: `email.vo.ts`, `password.vo.ts`, `role.vo.ts`.
- Repositorios: `user.repository.ts`, `token.repository.ts`.

### Aplicación
- Casos de Uso: `register-user.usecase.ts`, `login-user.usecase.ts`, `refresh-token.usecase.ts`.
- DTOs: `user.dto.ts`, `token.dto.ts`.
- Excepciones: `invalid-credentials.exception.ts`, `user-already-exists.exception.ts`.

### Infraestructura
- Repositorios: `firestore-user.repository.ts`, `firestore-token.repository.ts`.
- Servicios: `jwt-token.service.ts`, `password-hasher.service.ts`.
- Controladores: `register.controller.ts`, `login.controller.ts`, `refresh-token.controller.ts`.
- Rutas: `auth.routes.ts`.



## Endpoints

### POST /auth/register

Registra un nuevo usuario.

    {
      "email": "user@example.com",
      "password": "password123",
      "role": "user"
    }

### POST /auth/login

Inicia sesión con email y contraseña.

    {
      "email": "user@example.com",
      "password": "password123"
    }

### POST /auth/refresh-token

Renueva el token de acceso utilizando un refreshToken válido.

    {
      "refreshToken": "<your_refresh_token>"
    }

Consideraciones Técnicas
------------------------

*   **Validaciones:** Email válido y único, contraseñas con al menos 6 caracteres, roles válidos (`admin`, `user`).
*   **Tokens:** `accessToken` válido por 15 minutos, `refreshToken` válido por 7 días.
*   **Errores Comunes:**
    *   `401 Unauthorized:` Credenciales inválidas o token no válido.
    *   `409 Conflict:` Usuario ya existe.

Próximos Pasos
--------------

*   **Fase 3:** Gestión de usuarios (CRUD).
*   **Seguridad:** Monitoreo de intentos fallidos y rotación de tokens.