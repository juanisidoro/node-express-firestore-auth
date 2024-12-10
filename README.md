# Clean Architecture Migration

Este proyecto muestra cómo evolucionamos desde una estructura básica hacia una arquitectura basada en principios de **Clean Architecture** y **Hexagonal Architecture**, lo que mejora la organización, escalabilidad y mantenibilidad del código.

## Estructura Anterior

La estructura inicial del proyecto era la siguiente:

### Estructura Anterior

```
src
├── app.ts
├── auth
│   ├── controllers
│   │   ├── loginController.ts
│   │   ├── refreshTokenController.ts
│   │   └── registerController.ts
│   ├── routes
│   │   └── authRoutes.ts
│   ├── services
│   │   ├── tokenService.ts
│   │   └── userService.ts
├── config
│   └── firestore.ts
├── middleware
│   └── errorHandler.ts
├── server.ts
├── types
│   ├── tokenTypes.ts
│   └── userTypes.ts
```

### Problemas Detectados:
1. **Acoplamiento:** Los servicios, controladores y configuraciones estaban acoplados, dificultando la extensión o el cambio de tecnologías.
2. **Escalabilidad:** Agregar nuevos casos de uso o entidades sería complicado debido a la falta de separación clara entre responsabilidades.
3. **Pruebas:** La falta de interfaces o separación dificultaba las pruebas unitarias y los mocks.

---

## Nueva Estructura

Implementamos una nueva arquitectura basada en **Clean Architecture**, reorganizando el proyecto en capas bien definidas:

```
src
├── application
│   ├── usecases
│   │   ├── authenticateUser.ts
│   │   ├── createUser.ts
│   │   ├── generateTokens.ts
│   │   └── refreshToken.ts
│   └── services
│       ├── tokenService.ts
│       └── userService.ts
├── domain
│   ├── entities
│   │   ├── token.ts
│   │   └── user.ts
│   ├── repositories
│   │   ├── tokenRepository.ts
│   │   └── userRepository.ts
│   └── types
│       ├── tokenTypes.ts
│       └── userTypes.ts
├── infrastructure
│   ├── db
│   │   └── firestore.ts
│   ├── repositories
│   │   ├── firestoreTokenRepository.ts
│   │   └── firestoreUserRepository.ts
│   └── env
│       └── dotenvConfig.ts
├── interfaces
│   ├── controllers
│   │   ├── auth
│   │   │   ├── loginController.ts
│   │   │   ├── refreshTokenController.ts
│   │   │   └── registerController.ts
│   └── routes
│       └── authRoutes.ts
├── middleware
│   └── errorHandler.ts
├── app.ts
├── server.ts

```


---

## Beneficios de la Nueva Arquitectura

1. **Separación de Responsabilidades:**
   - Cada capa tiene una responsabilidad clara:
     - `domain`: Define las reglas de negocio y entidades.
     - `application`: Orquesta los casos de uso y lógica de aplicación.
     - `infrastructure`: Implementa dependencias externas (bases de datos, configuraciones).
     - `interfaces`: Expone adaptadores como controladores y rutas HTTP.

2. **Escalabilidad:**
   - Es fácil agregar nuevas funcionalidades sin afectar las capas existentes.
   - Las dependencias entre capas están controladas.

3. **Facilidad de Pruebas:**
   - Los repositorios y servicios están definidos como interfaces, facilitando la creación de mocks.
   - Cada capa se puede probar de manera aislada.

4. **Mantenibilidad:**
   - El código está organizado de forma modular y clara, reduciendo la complejidad al navegar entre archivos.

---