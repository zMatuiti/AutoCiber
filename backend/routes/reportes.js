const express = require('express');
const router = express.Router();
const db = require('../data-base/db'); // Asegúrate de que esta ruta sea correcta

// Obtener todos los reportes
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Reporte';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener reportes:', err.message);
      res.status(500).send('Error al obtener reportes');
    } else {
      res.json(rows);
    }
  });
});

// Agregar un nuevo reporte
router.post('/', (req, res) => {
  const { Fecha_Generacion, Tipo_Reporte, Detalles, Generado_Por, ID_Usuario } = req.body;

  if (!Fecha_Generacion || !Tipo_Reporte || !Detalles || !Generado_Por || !ID_Usuario) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const query = `
    INSERT INTO Reporte (Fecha_Generacion, Tipo_Reporte, Detalles, Generado_Por, ID_Usuario)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [Fecha_Generacion, Tipo_Reporte, Detalles, Generado_Por, ID_Usuario], function (err) {
    if (err) {
      console.error('Error al agregar reporte:', err.message);
      res.status(500).send('Error al agregar reporte');
    } else {
      res.json({ ID_Reporte: this.lastID });
    }
  });
});

// Eliminar un reporte
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Reporte WHERE ID_Reporte = ?';
  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error al eliminar reporte:', err.message);
      res.status(500).send('Error al eliminar reporte');
    } else if (this.changes === 0) {
      res.status(404).send('Reporte no encontrado');
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
