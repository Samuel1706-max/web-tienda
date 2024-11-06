// const express = require("express");
// const mysql = require("mysql2"); // Usa mysql2 en lugar de mysql
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.json());

// // Configuración de la conexión MySQL
// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root", // Cambia esto por tu usuario de MySQL
//   password: "root", // Cambia esto por tu contraseña de MySQL
//   database: "viva_sport", // Asegúrate de que el nombre esté en minúsculas y sea correcto
//   port: 3306,
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error al conectar con la base de datos:", err);
//   } else {
//     console.log("Conectado a la base de datos MySQL");
//   }
// });

// // Ruta para registrar al usuario
// app.post("/registrar", (req, res) => {
//   const { nombre, apellido, correo_electronico } = req.body; // Obtén los datos del cuerpo de la solicitud

//   const sql = "INSERT INTO registro_usuario (nombre, apellido, correo_electronico) VALUES (?, ?, ?)";
//   db.query(sql, [nombre, apellido, correo_electronico], (err, result) => {
//     if (err) {
//       res.status(500).send("Error al registrar el usuario");
//       console.error(err);
//     } else {
//       res.send("Usuario registrado exitosamente");
//     }
//   });
// });

// // Iniciar el servidor
// app.listen(3000, () => {
//   console.log("Servidor ejecutándose en http://localhost:3000");
// });

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors"); 

const app = express();
app.use(cors()); 
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root", 
  password: "root", 
  database: "viva_sport", 
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});


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
app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
