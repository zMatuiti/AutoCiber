const express = require('express');
const router = express.Router();
const db = require('../data-base/db'); // Conexión a la base de datos

// Obtener todos los dispositivos
router.get('/', (req, res) => {
  db.all('SELECT * FROM Dispositivo', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener dispositivos:', err.message);
      res.status(500).send('Error al obtener dispositivos');
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
