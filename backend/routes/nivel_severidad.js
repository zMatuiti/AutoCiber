const express = require('express');
const router = express.Router();
const db = require('../data-base/db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM Nivel_severidad', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener Nivel_severidad:', err.message);
      res.status(500).send('Error al obtener Nivel_severidad');
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
