
# Fase 3 - Gestión de Usuarios (DDD)

Este branch introduce la funcionalidad de **Gestión de Usuarios** utilizando principios de **DDD (Domain-Driven Design)**, **Clean Architecture** y **SOLID**. Se implementa un CRUD completo de usuarios, protegiendo las rutas con autorización basada en roles.

---

## Nuevos Archivos Agregados

En comparación con la Fase 2, se han añadido los siguientes archivos:

### **Capa de Dominio**
- `src/domain/auth/interfaces/user-management.repository.ts`: Define los métodos necesarios para la gestión completa de usuarios.

### **Capa de Aplicación**
- `src/application/auth/dtos/user-management.dto.ts`: Define los DTOs para las operaciones de gestión de usuarios (`UpdateUserDTO`, `GetUserDTO`, etc.).
- `src/application/auth/usecases/list-users.usecase.ts`: Caso de uso para listar todos los usuarios.
- `src/application/auth/usecases/get-user.usecase.ts`: Caso de uso para obtener un usuario por email.
- `src/application/auth/usecases/update-user.usecase.ts`: Caso de uso para actualizar datos de un usuario.
- `src/application/auth/usecases/delete-user.usecase.ts`: Caso de uso para eliminar un usuario.

### **Capa de Infraestructura**
- `src/infrastructure/auth/repositories/firestore-user-management.repository.ts`: Implementación del repositorio de gestión de usuarios utilizando Firestore.
- `src/infrastructure/auth/controllers/user.controller.ts`: Controladores para las operaciones de gestión de usuarios.
- `src/infrastructure/auth/routes/user.routes.ts`: Define las rutas para las operaciones CRUD de usuarios.
- `src/infrastructure/middleware/authorize.middleware.ts`: Middleware para verificar tokens y roles antes de permitir el acceso a las rutas protegidas.

---

## Endpoints Disponibles

### **Autenticación**

#### **POST /auth/register**
Registrar un nuevo usuario.  
**Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

#### **POST /auth/login**
Iniciar sesión con un usuario registrado.  
**Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### **POST /auth/refresh-token**
Obtener un nuevo `accessToken` utilizando un `refreshToken`.  
**Body (JSON):**
```json
{
  "refreshToken": "<your_refresh_token>"
}
```

---

### **Gestión de Usuarios**

#### **GET /users**
Lista todos los usuarios (requiere rol `admin`).  
**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

#### **GET /users/:email**
Obtiene los datos de un usuario por su email (requiere rol `admin`).  
**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

#### **PUT /users/:email**
Actualiza datos de un usuario (requiere rol `admin`).  
**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```
**Body (JSON):**
```json
{
  "role": "admin"
}
```

#### **DELETE /users/:email**
Elimina un usuario por su email (requiere rol `admin`).  
**Headers:**
```json
{
  "Authorization": "Bearer <access_token>"
}
```

---

## Pruebas Manuales

### Registro y Login
1. **Registrar un Usuario:**
   - Endpoint: `POST /auth/register`.
   - Body: `{ "email": "test@example.com", "password": "password123", "role": "user" }`.

2. **Iniciar Sesión:**
   - Endpoint: `POST /auth/login`.
   - Body: `{ "email": "test@example.com", "password": "password123" }`.
   - Obtendrás un `accessToken` y `refreshToken`.

### Gestión de Usuarios
1. **Listar Usuarios:**
   - Endpoint: `GET /users`.
   - Headers: `{ "Authorization": "Bearer <admin_access_token>" }`.

2. **Obtener Usuario:**
   - Endpoint: `GET /users/test@example.com`.
   - Headers: `{ "Authorization": "Bearer <admin_access_token>" }`.

3. **Actualizar Usuario:**
   - Endpoint: `PUT /users/test@example.com`.
   - Headers: `{ "Authorization": "Bearer <admin_access_token>" }`.
   - Body: `{ "role": "admin" }`.

4. **Eliminar Usuario:**
   - Endpoint: `DELETE /users/test@example.com`.
   - Headers: `{ "Authorization": "Bearer <admin_access_token>" }`.

---

## Consideraciones Técnicas

1. **Autorización Basada en Roles:**
   - Solo los usuarios con rol `admin` pueden realizar operaciones de gestión de usuarios.

2. **Validaciones:**
   - Los emails deben ser válidos y únicos.
   - Las contraseñas deben tener al menos 6 caracteres.
   - Los roles válidos son `"admin"` y `"user"`.

3. **Tokens:**
   - Los `accessToken` tienen una validez corta (15 minutos).
   - Los `refreshToken` son válidos por 7 días.

4. **Errores Comunes:**
   - `401 Unauthorized`: Si el token es inválido o faltante.
   - `403 Forbidden`: Si el rol del usuario no tiene permisos para acceder al recurso.
   - `404 Not Found`: Si el recurso solicitado no existe.

---

## Próximos Pasos

1. **Implementar Pruebas Automatizadas:**
   - Pruebas unitarias para casos de uso, controladores y middleware.
   - Pruebas de integración para validar el flujo completo.

2. **Optimización:**
   - Cache de consultas frecuentes.
   - Mejorar el manejo de errores en rutas protegidas.

3. **Seguridad:**
   - Rotación de tokens.
   - Protección contra ataques de fuerza bruta en login.

---

Este README proporciona un resumen general y práctico para trabajar con la rama `fase-3-gestion-usuarios-ddd`.
