const { pool } = require("../config/database");
const { errorResponse } = require("./utils");

const validarCampos = ({ razonsocial, contacto, ruc, direccion } = {}) => {
  const errores = [];

  if (razonsocial.trim() === "") errores.push("La razon social es obligatoria");
  if (contacto.trim() === "") errores.push("El contacto es obligatorio");
  if (ruc.trim() === "") errores.push("El ruc es obligatorio");

  return errores;
};

const query = {
  listar: "SELECT * FROM proveedores ORDER BY id",
  obtener: "SELECT * FROM proveedores WHERE id = ?",
  crear:
    "INSERT INTO proveedores (razonsocial, contacto, ruc, direccion) VALUES (?,?,?,?)",
  actualizar:
    "UPDATE proveedores SET razonsocial=?,contacto=?,ruc=?,direccion=? WHERE id=?",
  eliminar: "DELETE FROM proveedores WHERE id = ?",
};

const listar = async (req, res) => {
  try {
    const [registros] = await pool.query(query.listar);
    res.status(200).json({
      ok: true,
      total: registros.length,
      data: registros,
    });
  } catch (e) {
    errorResponse(res, e);
  }
};

const obtener = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id || id <= 0) {
      return res.status(400).json({
        ok: false,
        message: "El ID debe ser un numero positivo",
      });
    }

    const [registro] = await pool.execute(query.obtener, [id]);
    if (registro.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No existe el proveedor",
      });
    }

    return res.status(200).json({
      ok: true,
      data: registro[0],
    });
  } catch (e) {
    errorResponse(res, e);
  }
};

const crear = async (req, res) => {
  try {
    const errores = validarCampos(req.body);
    if (errores.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "Verifique los datos solicitados",
        errores,
      });
    }

    const { razonsocial, contacto, ruc, direccion } = req.body;
    const [registro] = await pool.execute(query.crear, [
      razonsocial,
      contacto,
      ruc,
      direccion,
    ]);

    return res.status(201).json({
      ok: true,
      id: registro.insertId,
    });
  } catch (e) {
    errorResponse(res, e);
  }
};

const actualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id || id <= 0) {
      return res.status(400).json({
        ok: false,
        message: "El ID debe ser un numero positivo",
      });
    }

    const errores = validarCampos(req.body);
    if (errores.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "Verifique los datos solicitados",
        errores,
      });
    }

    const [existe] = await pool.execute(query.obtener, [id]);
    if (existe.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No existe el proveedor",
      });
    }

    const { razonsocial, contacto, ruc, direccion } = req.body;
    const [resultado] = await pool.execute(query.actualizar, [
      razonsocial,
      contacto,
      ruc,
      direccion,
      id,
    ]);

    res.status(200).json({
      ok: true,
      filasAfectadas: resultado.affectedRows,
    });
  } catch (e) {
    errorResponse(res, e);
  }
};

const eliminar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id || id <= 0) {
      return res.status(400).json({
        ok: false,
        message: "El ID debe ser un numero positivo",
      });
    }

    const [resultado] = await pool.execute(query.eliminar, [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: "No existe el proveedor",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Proveedor eliminado",
    });
  } catch (e) {
    errorResponse(res, e);
  }
};

module.exports = {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
};
