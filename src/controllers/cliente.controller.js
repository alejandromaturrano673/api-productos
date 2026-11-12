const { pool } = require("../config/database");
const { errorResponse } = require("./utils");

const validarCampos = ({
  apellidos,
  nombres,
  telefono,
  direccion,
  email,
} = {}) => {
  const errores = [];

  if (apellidos.trim() === "") errores.push("Los apellidos son obligatorios");
  if (nombres.trim() === "") errores.push("Los nombres son obligatorio");

  return errores;
};

const query = {
  listar: "SELECT * FROM clientes ORDER BY id",
  obtener: "SELECT * FROM clientes WHERE id = ?",
  crear:
    "INSERT INTO clientes (apellidos,nombres,telefono,direccion,email) VALUES (?,?,?,?,?)",
  actualizar:
    "UPDATE clientes SET apellidos=?,nombres=?,telefono=?,direccion=?,email=? WHERE id=?",
  eliminar: "DELETE FROM clientes WHERE id = ?",
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
        message: "No existe el cliente",
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

    const { apellidos, nombres, telefono, direccion, email } = req.body;
    const [registro] = await pool.execute(query.crear, [
      apellidos,
      nombres,
      telefono,
      direccion,
      email,
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
        message: "No existe el cliente",
      });
    }

    const { apellidos, nombres, telefono, direccion, email } = req.body;
    const [resultado] = await pool.execute(query.actualizar, [
      apellidos,
      nombres,
      telefono,
      direccion,
      email,
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
        message: "No existe el cliente",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Cliente eliminado",
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
