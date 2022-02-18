/* eslint-disable no-console */
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan"); // MIDDLEWARE
const cors = require("cors");

dotenv.config();

// conectarse a DB
// const connectDatabase = require("./config/db");
// connectDatabase();

// Instancias de Rutas
const fightRoute = require("./src/routes/fights");

const app = express();
app.use(express.json()); // Let Express Handle JSON
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rutas de Backend
app.use("/v1/fight", fightRoute);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log("Servidor se ejecuta en ambiente", process.env.NODE_ENV),
);

process.on("unhandledRejection", (err) => {
  console.log("Errores:", err.message);
  server.close(() => process.exit(1));
});
