// app = application
const path = require("path");
const express = require("express"); //Framework
const routes = require("./routes"); //Rutas

const app = express(); //Inicializamos la App

app.use(express.json()); //Comunicación es JSON

//Mensaje predeterminado
//http://miaplicacion.com/
// app.get("/", (req, res) => {
//   res.status(200).json({
//     ok: true,
//     message: "API REST ejecutandose correctamente",
//   });
// });

//Ahora se sirve toda la carpeta "public"
app.use(express.static(path.join(__dirname, "..", "public")));

//Habilitamos las rutas de todos los módulos (index.js)
app.use("/api", routes);
module.exports = app;
