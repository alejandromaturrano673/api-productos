//Nuestra aplicación puede tener muchos módulos:
//Productos > producto.controller > producto.routes
//Clientes > cliente.controller > cliente.routes
//Proveedores > proveedor.controller > proveedor.routes

// Todas las rutas se organizan gracias a index.js (indice)
const { Router, Router } = require("express");

//Esto se realiza por cada routes
const productoRoutes = require("./producto.routes");

//Esto es solo uno para todas las rutas
const router = Router();

//Esto es por cada routes
router.use("/productos", productoRoutes);

//Se exportan todas las rutas
module.exports = router;
