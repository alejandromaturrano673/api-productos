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
      data: productos
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const obtenerProducto = async (req, res) => {
  try {
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
