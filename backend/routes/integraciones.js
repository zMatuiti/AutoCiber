const express = require('express');
const router = express.Router();
const db = require('../data-base/db'); // Ruta correcta a db.js

router.get('/', (req, res) => { // Ajusta la ruta si es necesario
  db.all('SELECT * FROM Integracion', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener integraciones:', err.message);
      res.status(500).send('Error al obtener integraciones');
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
