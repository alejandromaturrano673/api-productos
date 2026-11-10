//Necesita que app haya gestiona toda la configuracion
const app = require(" ./app");
const { port } = require("./config/env");
const { probarConexion } = require("./config/database");

const iniciarServidor = async () => {
  try {
    await probarConexion();
    console.log("Conexion a MySQL exitosa");

    // Levantamos los servicios
    app.listen(port, () => {
      console.log(`Servidor iniciado en http://localhost:${port}`);
    });
  } catch (e) {
    console.error(`No podemos conectarnos a MySQL`, e.message);
    process.exit(1);
  }
};

iniciarServidor();
