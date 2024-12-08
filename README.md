# Fase 1: Configuración básica del entorno

**Objetivo**:  
Configurar el entorno inicial de desarrollo para el proyecto. Esta fase establece las bases necesarias para las siguientes implementaciones.

---

## Características Implementadas

1. **Estructura básica del proyecto**:
   - Organización de carpetas (`src`, `credentials`, etc.).
   - Archivo `.gitignore` para excluir archivos sensibles.
2. **Configuración de TypeScript**:
   - Compilador configurado mediante `tsconfig.json`.
   - Dependencias básicas instaladas.
3. **Conexión con Firestore**:
   - Configuración del Firebase Admin SDK.
   - Verificación de conectividad con Firestore.
4. **Servidor Express básico**:
   - Servidor que responde con un mensaje de prueba en la ruta `/health`.

---

## Pasos Realizados

1. **Inicialización del proyecto**:
   - Proyecto creado con `npm init`.
   - Dependencias instaladas:
     - Express, Firebase Admin SDK, TypeScript, y otros paquetes esenciales.
   - Archivo `tsconfig.json` configurado para usar TypeScript.
2. **Conexión con Firestore**:
   - Configuración de Firebase Admin SDK en `src/config/firestore.ts`.
   - Verificación de conectividad mediante el archivo de prueba `src/testFirestore.ts`.
3. **Configuración del servidor Express**:
   - Creación de un servidor básico en `src/app.ts`.
   - Ruta `/health` para confirmar que el servidor está funcionando.

---

## Cómo Usar esta Fase

### 1. Instalar Dependencias
Asegúrate de tener Node.js instalado. En la raíz del proyecto, ejecuta:

```bash
npm install
```

### 2. Configurar Credenciales
Crea un archivo .env en la raíz del proyecto:

```bash
FIREBASE_CREDENTIALS=./credentials/firebase-service-account.json
PORT=3000
```
### 3. Arrancar el Servidor
Ejecuta el siguiente comando:

```bash
npx ts-node src/server.ts
```

El servidor estará corriendo en http://localhost:3000.

### 4. Probar el Servidor
Realiza una solicitud GET a:

```bash
http://localhost:3000/health
```
La respuesta esperada es:

```bash
{
  "status": "OK",
  "message": "Server is running"
}
```

### 5. Probar la Conexión con Firestore
Ejecuta el archivo de prueba:

bash
Copiar código

```bash
npx ts-node src/testFirestore.ts
```

Verifica que los datos de prueba se escriban en Firestore.

Notas Importantes


> **Nota Importante**: 
Este README está diseñado para ser usado únicamente en la rama fase-1-configuracion.
El archivo src/testFirestore.ts es solo para verificar la conectividad con Firestore y no forma parte de las siguientes fases.
