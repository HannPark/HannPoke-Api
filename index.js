/* eslint-disable no-console */
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDatabase = require("./config/db");

dotenv.config();
connectDatabase();

const fightRoute = require("./src/routes/fights");

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/v1/fight", fightRoute);

const PORT = process.env.PORT || 3000;
const server = app.listen(
  PORT,
  console.log("Servidor se ejecuta en ambiente", process.env.NODE_ENV),
);

process.on("unhandledRejection", (err) => {
  console.log("Errores:", err.message);
  server.close(() => process.exit(1));
});
