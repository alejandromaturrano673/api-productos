const errorResponse = (res, e) => {
  console.error(e);
  return res.status(500).json({
    ok: false,
    message: "Error interno en el servidor",
  });
};

module.exports = { errorResponse };
