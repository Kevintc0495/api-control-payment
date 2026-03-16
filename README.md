# 🏦 Control Pay Backend

API REST para el sistema de control de pagos desarrollada con Node.js, Express y SQL Server.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v20 o superior)
- [pnpm](https://pnpm.io/) (gestor de paquetes)
- [Docker](https://www.docker.com/) y Docker Compose (con Docker Desktop abierto)
- Cliente de base de datos compatible con SQL Server (Azure Data Studio, SSMS, o DBeaver)

---

## 🚀 Instalación y puesta en marcha (modo desarrollo)

### 1. Instalar dependencias

```bash
pnpm install
```

> Esto también configura automáticamente los git hooks de Husky (commitlint).

### 2. Configurar variables de entorno

Copia el archivo `.env.example` y crea `.env.development`:

```bash
cp .env.example .env.development
```

Edita `.env.development` con la siguiente configuración:

```env
DB_USER=sa
DB_PASSWORD=Admin123!
DB_DATABASE=db_control_pay
DB_SQL=MSSQL
DB_HOST=localhost
PORT=3000
SECRET=tu_clave_secreta_jwt
EMAIL=tu_correo@gmail.com
EMAIL_PASSWORD=tu_password_de_aplicacion
EMAIL_ADMIN=admin@example.com
```

> La contraseña `Admin123!` coincide con la configuración del `docker-compose.yml`.

### 3. Levantar SQL Server con Docker

Asegúrate de tener Docker Desktop abierto y luego ejecuta:

```bash
pnpm run docker
```

Esto levanta un contenedor de SQL Server 2022 en segundo plano con un volumen persistente (`sqlserver_data`). Tus datos se mantienen aunque detengas y vuelvas a levantar el contenedor.

> **¿Cuándo se pierden los datos?** Solo si ejecutas `docker compose down -v` o eliminas el volumen manualmente.

### 4. Crear la base de datos

Conéctate a SQL Server con tu cliente preferido:

- **Host:** `localhost,50807`
- **Usuario:** `sa`
- **Contraseña:** `Admin123!`

Crea la base de datos con el nombre definido en `DB_DATABASE`:

```sql
CREATE DATABASE db_control_pay;
```

### 5. Levantar el servidor (Sequelize crea las tablas)

```bash
pnpm run dev
```

Al iniciar, Sequelize sincroniza los modelos y crea automáticamente todas las tablas en la base de datos. El servidor quedará disponible en `http://localhost:3000`.

### 6. Insertar datos iniciales

```bash
pnpm run seed:all
```

Esto inserta los datos base necesarios: roles, tipos de documento, bancos, sedes, tipos de pago, estados de pago y el usuario administrador inicial.

---

## 🔑 Credenciales de acceso iniciales

Después de ejecutar los seeders, puedes acceder con:

- **Email:** `ktorrescolan@gmail.com`
- **Contraseña:** `1234`

> **⚠️ Nota:** Esta contraseña es solo para desarrollo local.

---

## ⚙️ Modos de ejecución

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Desarrollo local — usa `.env.development` con nodemon (recarga automática) |
| `pnpm run dev:cloud` | Desarrollo apuntando a cloud — usa `.env.production` con nodemon (recarga automática) |
| `pnpm run start` | Producción — ejecuta `build/src/index.js` (requiere `pnpm run build` previo) |
| `pnpm run start:local` | Producción con variables locales — usa `.env.development`, ejecuta el build |
| `pnpm run start:cloud` | Producción con variables cloud — usa `.env.production`, ejecuta el build |

> Los scripts `start*` requieren haber compilado previamente con `pnpm run build`.

---

## 🗂️ Estructura del Proyecto

```
src/
├── application/       # Lógica de aplicación
│   ├── dtos/         # Data Transfer Objects
│   ├── exceptions/   # Excepciones personalizadas
│   ├── repositories/ # Interfaces de repositorios
│   ├── services/     # Interfaces de servicios
│   └── useCases/     # Casos de uso (lógica de negocio)
├── domain/           # Modelos de dominio y enums
├── infrastructure/   # Implementaciones técnicas
│   ├── config/       # Configuración de BD y dependencias
│   ├── persistence/  # Modelos de Sequelize
│   ├── repositories/ # Implementación de repositorios
│   └── services/     # Implementación de servicios
└── presentation/     # Capa de presentación
    ├── controllers/  # Controladores HTTP
    ├── middleware/   # Middlewares de Express
    └── routes/       # Definición de rutas
```

---

## 🛠️ Tecnologías Utilizadas

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Base de Datos:** SQL Server 2022
- **ORM:** Sequelize
- **Contenedores:** Docker
- **Autenticación:** JWT (jsonwebtoken)
- **Inyección de Dependencias:** Awilix

---

## 🐳 Comandos útiles de Docker

```bash
# Ver contenedores en ejecución
docker ps

# Detener el contenedor (mantiene los datos)
docker compose down

# Volver a levantar el contenedor
pnpm run docker

# Ver logs del contenedor
docker logs sqlserver_container

# Eliminar todo, incluyendo los datos (⚠️ IRREVERSIBLE)
docker compose down -v
```

---

## 🗄️ Migraciones y Seeders

Estos comandos son de uso puntual para gestión de esquema y datos, no forman parte del flujo de arranque normal.

| Comando | Descripción |
|---------|-------------|
| `pnpm run migration` | Ejecuta las migraciones de Sequelize CLI pendientes |
| `pnpm run undo-m` | Revierte la última migración |
| `pnpm run seed:all` | Ejecuta todos los seeders |
| `pnpm run file-migraton` | Genera un nuevo archivo de migración |
| `pnpm run file-generate` | Genera un nuevo archivo seeder |
| `pnpm run build` | Compila el proyecto TypeScript a `build/` |
| `pnpm run lint` | Ejecuta el linter sobre los archivos fuente |

---

## 📧 Contacto

Desarrollado por Kevin Torres — [ktorrescolan@gmail.com](mailto:ktorrescolan@gmail.com)

---

¡Listo! Ahora puedes usar el sistema de Control Pay. 🎉
