const express = require('express');
const router = express.Router();
const db = require('../data-base/db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM Tipo_Politica_Seguridad', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener tipos de políticas:', err.message);
      res.status(500).send('Error al obtener tipos de políticas');
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
