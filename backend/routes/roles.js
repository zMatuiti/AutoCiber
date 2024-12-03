const express = require('express');
const router = express.Router();
const db = require('../data-base/db'); 

router.get('/', (req, res) => {
  db.all('SELECT Rol FROM Rol_Usuario', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener roles:', err.message);
      res.status(500).json({ success: false, message: 'Error al obtener roles.' });
    } else {
      res.json(rows.map((row) => row.Rol)); // Devolver solo los nombres de los roles
    }
  });
});

module.exports = router;
