# Fase 2 - UI: Login, Registro y Dashboard

En esta rama, se implementa una interfaz de usuario básica que interactúa con el backend para realizar las siguientes funciones:

## **Objetivo**
Crear una interfaz funcional y simple para:
- **Login**: Permitir a los usuarios autenticarse con su email y contraseña.
- **Registro**: Permitir a nuevos usuarios registrarse con un rol específico.
- **Dashboard**: Mostrar una página de bienvenida con información del usuario si está autenticado y un botón de cierre de sesión. Si no está autenticado, muestra un mensaje de error con opciones para ir a login o registro.

---

## **Contenido**
Las páginas implementadas y sus características incluyen:

1. **Login Page (`login.html`)**:
   - Permite a los usuarios autenticarse con sus credenciales.
   - Valida que los campos de email y contraseña estén completos.
   - Almacena los tokens (`accessToken`, `refreshToken`) en `localStorage` tras un login exitoso.
   - Redirige al **dashboard** al autenticarse correctamente.
   - Maneja errores de autenticación mostrando mensajes genéricos (sin indicar si el error es por email o contraseña).

2. **Registro Page (`register.html`)**:
   - Permite a los usuarios registrarse proporcionando su email, contraseña y rol.
   - Valida que todos los campos requeridos estén completos.
   - Almacena los tokens (`accessToken`, `refreshToken`) y redirige al **dashboard** tras un registro exitoso.
   - Maneja errores de registro mostrando mensajes genéricos.

3. **Dashboard Page (`dashboard.html`)**:
   - Muestra información básica del usuario (email y fragmento del token) si está autenticado.
   - Proporciona un botón de **logout** para cerrar sesión y redirigir al login.
   - Si no está autenticado, muestra un mensaje de "Access Denied" con opciones para ir a login o registro.

---

## **Archivos Clave**
La implementación se distribuye en los siguientes archivos:

### **HTML**
- `login.html`: Formulario de inicio de sesión.
- `register.html`: Formulario de registro.
- `dashboard.html`: Página de usuario autenticado o mensaje de error.

### **CSS**
- `style.css`: Estilos básicos para un diseño limpio y sencillo.

### **JavaScript**
- `app.js`: Contiene la lógica de la UI, maneja solicitudes al backend y controla el flujo de autenticación.

### **Backend Requerido**
El backend desarrollado en la rama `fase-2-autenticacion` es necesario para manejar las solicitudes realizadas desde esta interfaz. Los endpoints clave son:
- `POST /auth/register`: Registrar un nuevo usuario.
- `POST /auth/login`: Autenticar un usuario existente.
- `POST /auth/refresh-token`: Renovar el token de acceso (opcional, no implementado aquí directamente).

---

## **Pasos para Configurar y Probar**

### **1. Levantar el Servidor del Backend**
1. Navega al proyecto backend (`fase-2-autenticacion`).
2. Asegúrate de que el backend está funcionando:
```bash
   npx ts-node src/server.ts
```
3. Confirma que los endpoints (/auth/register, /auth/login) están activos y accesibles en http://localhost:3000.

### **2. Levantar el Servidor del Frontend**
1. Navega a la carpeta src/ui en la terminal.
2. Usa un servidor estático como live-server:
```bash
   npx live-server
```
3. Asegúrate de que el frontend esté disponible en http://127.0.0.1:8080 (o el puerto que indique live-server).

### **3. Realizar Pruebas**

**Login**
* Accede a http://127.0.0.1:8080/login.html.
* Ingresa credenciales de un usuario registrado en el backend.
* Verifica que redirige al dashboard tras un login exitoso.
* Verifica que muestra un mensaje genérico si las credenciales son incorrectas.

**Registro**
* Accede a http://127.0.0.1:8080/register.html.
* Registra un nuevo usuario proporcionando email, contraseña y rol.
* Verifica que redirige al dashboard tras un registro exitoso.
* Verifica que muestra un mensaje genérico si ocurre un error (por ejemplo, email ya registrado).

**Dashboard**
* Accede a http://127.0.0.1:8080/dashboard.html:
* Si el usuario está autenticado:
* Muestra email y fragmento del token.
* Permite cerrar sesión con el botón Logout.
* Si el usuario no está autenticado:
* Muestra el mensaje "Access Denied" y los botones de Login y Register.


---

## **Notas Adicionales**
* Almacenamiento Local: Los tokens de acceso y refresco, así como el email, se almacenan temporalmente en localStorage para simular el comportamiento real de autenticación.
* Seguridad: Dado que este es un proyecto educativo, considera implementar mejores prácticas de manejo de tokens y seguridad para un entorno de producción (como usar cookies HttpOnly para tokens).

---

## **Limitaciones**
* No se implementa la renovación automática de tokens en esta fase.
* La UI está diseñada únicamente para pruebas y no tiene un diseño avanzado ni validaciones robustas.