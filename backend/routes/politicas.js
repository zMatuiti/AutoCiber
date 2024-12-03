const express = require('express');
const router = express.Router();
const db = require('../data-base/db'); // Conexión a la base de datos

// Obtener todas las políticas
router.get('/', (req, res) => {
  db.all('SELECT * FROM Politica_seguridad', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener políticas:', err.message);
      res.status(500).send('Error al obtener políticas');
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
