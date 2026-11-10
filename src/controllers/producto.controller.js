//const objeto = require('') //TODOS LAS FUNCIONES
//const { otro0bjeto } = require('') //SOLO ALGUNAS FUNCIONES

const { pool } = require("../config/database");
const CAMPOS = "id, marca, descripcion, precio, stock"; //Dato común

//Todas las funciones serán ASÍNCRONAS (tardarán un tiempo en ser resueltas ...
//milisegundos, segundos (1000 = 1seg)
//Todas las funciones reciben y envian datos (pasarelas)
//req (require - solicitar >>>), res (result - <<< resultado)
/** @type {import('express').RequestHandler} */
const listarProductos = async (req, res) => {
  try {
    const [productos] = await pool.query("SELECT * FROM productos ORDER BY id");
    res.status(200).json({
      ok: true,
      total: productos.length,
      data: productos,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

//Buscar ¿cómo funciona?
//API REST http://miaplicacion.com/api/productos/1
/** @type {import('express').RequestHandler} */
const obtenerProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (id <= 0) {
      return res.status(400).json({
        ok: false,
        message: "El ID no puede ser negativo o cero",
      });
    }

    const [registro] = await pool.execute(
      "SELECT * FROM productos WHERE id = ?",
      [id],
    );
    if (registro.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No existe el producto",
      });
    }

    return res.status(200).json({
      ok: true,
      data: registro[0]
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const crearProducto = async (req, res) => {
  try {
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

//Todos los métodos deben ser EXPORTADOS (se utilizarán desde la app)
//el que lo utilizará será "routes"
module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
