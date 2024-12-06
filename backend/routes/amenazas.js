const express = require('express');
const router = express.Router();
const db = require('../data-base/db');

// Obtener amenazas
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Amenaza';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener amenazas:', err.message);
      return res.status(500).send('Error al obtener amenazas');
    }
    res.json(rows);
  });
});

// Insertar una nueva amenaza
router.post('/', (req, res) => {
  const { Fecha_deteccion, Nivel_severidad, Descripcion, Estado } = req.body;
  const ID_tipo_amenaza = 1; // Valor por defecto

  // Validación de datos
  if (!Fecha_deteccion || !Nivel_severidad || !Descripcion || !Estado) {
    console.error('Datos faltantes en la solicitud:', req.body);
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const query = `
    INSERT INTO Amenaza (ID_tipo_amenaza, Fecha_deteccion, Nivel_severidad, Descripcion, Estado)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [ID_tipo_amenaza, Fecha_deteccion, Nivel_severidad, Descripcion, Estado],
    function (err) {
      if (err) {
        console.error('Error al insertar amenaza:', err.message);
        return res.status(500).send('Error al insertar amenaza');
      }
      res.json({ ID_Amenaza: this.lastID });
    }
  );
});

// Eliminar una amenaza
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Amenaza WHERE ID_Amenaza = ?';
  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error al eliminar amenaza:', err.message);
      return res.status(500).send('Error al eliminar amenaza');
    }
    if (this.changes === 0) {
      return res.status(404).send('Amenaza no encontrada');
    }
    res.json({ message: 'Amenaza eliminada correctamente' });
  });
});

module.exports = router;
