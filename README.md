# Fase 2 - UI: Login, Registro y Dashboard

En esta rama, estamos trabajando en la implementación de una interfaz de usuario básica para las siguientes funcionalidades:

## **Objetivo**
Crear una interfaz simple para:
- **Login**: Permitir a los usuarios autenticarse con su email y contraseña.
- **Registro**: Permitir a nuevos usuarios registrarse con un rol específico.
- **Dashboard**: Mostrar una página de bienvenida que varíe según el rol del usuario.

## **Contenido**
Las páginas implementadas en esta rama incluyen:
1. **Login Page**:
   - Formulario para que los usuarios inicien sesión.
   - Validación básica de los campos requeridos.
   - Manejo de errores genéricos (sin indicar si el error es por email o contraseña).
2. **Registro Page**:
   - Formulario para que los usuarios se registren.
   - Selección de rol entre opciones permitidas (`admin`, `user`, etc.).
3. **Dashboard Page**:
   - Muestra un mensaje de bienvenida basado en el rol del usuario.
   - Incluye un botón para cerrar sesión, que elimina el token de autenticación.

## **Notas**
- Este código es únicamente para pruebas y no será fusionado con `develop`.
- Los cambios aquí realizados no interfieren con la lógica del backend en la rama `fase-2-autenticacion`.
- Se usará el backend desarrollado en la fase 2 para manejar las solicitudes de login, registro y validación de tokens.

## **Pruebas**
Para probar la UI:
1. Levanta el servidor del backend en `fase-2-autenticacion`.
2. Abre el archivo HTML localmente o configúralo con un servidor estático como `live-server` o similar.
3. Asegúrate de que las funcionalidades de login y registro están conectadas al backend.