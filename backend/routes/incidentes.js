const express = require('express');
const router = express.Router();
const db = require('../data-base/db'); // Conexión a la base de datos

// Obtener todos los incidentes
router.get('/', (req, res) => {
  db.all('SELECT * FROM Incidente', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener incidentes:', err.message);
      res.status(500).send('Error al obtener incidentes');
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
