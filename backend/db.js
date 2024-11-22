const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost', // Cambia según tu configuración
  user: 'root',      // Cambia según tu configuración
  password: 'password', // Cambia según tu configuración
  database: 'tu_base_de_datos', // Cambia por el nombre de tu base de datos
});

module.exports = db;
