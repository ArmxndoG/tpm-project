/****************************************************************
****** Archivo para crear la conexión con la base de datos *****/

const mysql = require("mysql2");
const dotenv = require("dotenv");

// Cargar variables de entorno del archivo .env
dotenv.config();

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


module.exports = pool.promise(); // Exportar el pool como una promesa