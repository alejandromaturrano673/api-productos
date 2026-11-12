# API Productos

API REST con Node.js, Express y MySQL que gestiona los datos de una tienda: productos, clientes y proveedores.

## Requisitos previos

- Node.js
- MySQL

## Instalación

Ejecutar `npm install`, crear la base de datos ejecutando el script `database/db.sql` y configurar el archivo `.env` con los datos de conexión: puerto, host, usuario, contraseña y nombre de la base de datos.

## Ejecución

Ejecutar `node src/server.js`. El servidor corre en http://localhost:3000.

## Endpoints

Cada módulo dispone de: listar todos (GET), obtener por ID (GET), crear (POST), actualizar (PUT) y eliminar (DELETE)

- /api/productos
- /api/clientes
- /api/proveedores