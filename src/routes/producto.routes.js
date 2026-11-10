const { Router } = require("express"); //Manejador de rutas
const controller = require("../controllers/producto.controller"); //Controlador (lógica)

const router = Router(); //Considerar los verbo

router.get("/", controller.listarProductos);
router.get("/:id", controller.obtenerProducto);
router.post('/', controller.crearProducto)
router.put('/:id', controller.actualizarProducto)
router.delete('/:id', controller.eliminarProducto)

//Pendiente ... PUT, POST, DELETE

module.exports = router;
