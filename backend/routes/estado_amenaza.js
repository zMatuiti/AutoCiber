const express = require('express');
const router = express.Router();
const db = require('../data-base/db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM Estado_amenaza', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener Estado_amenaza:', err.message);
      res.status(500).send('Error al obtener Estado_amenaza');
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
