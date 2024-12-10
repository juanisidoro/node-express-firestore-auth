  Users API Documentation

Users API
=========

Este proyecto incluye un endpoint básico para manejar usuarios, diseñado con buenas prácticas como **Clean Code**, **Arquitectura Hexagonal**, y **Domain-Driven Design (DDD)**.

Endpoints de Usuarios
---------------------

### 1\. Crear Usuario (POST /users)

**Descripción:** Permite crear un nuevo usuario.

**Restricción:** Solo usuarios con rol `admin` pueden crear usuarios.

**Body:**

        {
            "email": "user@example.com",
            "password": "password123",
            "role": "user"
        }
    

**Respuesta Exitosa:**

        {
            "id": "generated\_firestore\_id",
            "accessToken": "generated\_access\_token",
            "refreshToken": "generated\_refresh\_token"
        }
    

### 2\. Obtener Usuario (GET /users/:id)

**Descripción:** Permite obtener información de un usuario específico.

**Restricción:** Solo usuarios con rol `admin` o el propio usuario pueden acceder.

**Respuesta Exitosa:**

        {
            "email": "user@example.com",
            "role": "user"
        }
    

### 3\. Obtener Todos los Usuarios (GET /users)

**Descripción:** Permite obtener una lista de todos los usuarios.

**Restricción:** Solo usuarios con rol `admin`.

**Respuesta Exitosa:**

        \[
            {
                "email": "user1@example.com",
                "role": "user"
            },
            {
                "email": "admin@example.com",
                "role": "admin"
            }
        \]
    

### 4\. Actualizar Usuario (PUT /users/:id)

**Descripción:** Permite actualizar los datos de un usuario.

**Restricción:** Solo usuarios con rol `admin` o el propio usuario pueden realizar cambios.

**Body:**

        {
            "role": "admin"
        }
    

**Respuesta Exitosa:**

Código HTTP `204 No Content`.

### 5\. Eliminar Usuario (DELETE /users/:id)

**Descripción:** Permite eliminar un usuario específico.

**Restricción:** Solo usuarios con rol `admin`.

**Respuesta Exitosa:**

Código HTTP `204 No Content`.

Notas Técnicas
--------------

*   **Autenticación:**
    *   Todos los endpoints están protegidos con tokens JWT.
    *   El acceso está controlado mediante middlewares que verifican el rol del usuario (`admin` o `user`).
*   **Base de Datos:**
    *   Los usuarios se almacenan en Firestore.
    *   Los documentos de usuarios utilizan el `id` generado automáticamente por Firestore.

