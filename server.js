// Importar módulos necesarios
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

// Configuración de la aplicación
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "viva_sport",
  port: 3306,
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});

// Rutas de la API

// Ruta para registrar un usuario
app.post("/registrar_usuario", (req, res) => {
  const { nombre, apellido, correo_electronico } = req.body;

  const sql = "INSERT INTO registro_usuario (nombre, apellido, correo_electronico) VALUES (?, ?, ?)";
  db.query(sql, [nombre, apellido, correo_electronico], (err, result) => {
    if (err) {
      res.status(500).send("Error al registrar el usuario");
      console.error(err);
    } else {
      res.send("Usuario registrado exitosamente");
    }
  });
});

// Ruta para registrar un envío
app.post("/registrar_envio", (req, res) => {
  const { correo_electronico, direccion_envio, ciudad, codigo_postal, metodo_pago } = req.body;

  const sql = "INSERT INTO registro_compra (correo_electronico, direccion_envio, ciudad, codigo_postal, metodo_pago) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [correo_electronico, direccion_envio, ciudad, codigo_postal, metodo_pago], (err, result) => {
    if (err) {
      res.status(500).send("Error al registrar el envío");
      console.error(err);
    } else {
      res.send("Envío registrado exitosamente");
    }
  });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
