const express = require('express');
const router = express.Router();
const db = require('../data-base/db');

// Ruta para obtener todos los incidentes
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Incidente'; // Ajusta la consulta si necesitas nombres o relaciones
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener incidentes:', err.message);
      return res.status(500).send('Error al obtener incidentes');
    }
    res.json(rows);
  });
});

// Ruta para agregar un nuevo incidente
router.post('/', (req, res) => {
  const {
    Fecha_Inicio,
    Fecha_Fin,
    Descripcion,
    Estado,
    Accion_Tomada,
    ID_Amenaza,
    ID_Dispositivo,
    ID_Usuario,
  } = req.body;

  if (!Fecha_Inicio || !Descripcion || !Estado) {
    return res.status(400).send('Los campos Fecha_Inicio, Descripcion y Estado son obligatorios');
  }

  const query = `
    INSERT INTO Incidente (Fecha_Inicio, Fecha_Fin, Descripcion, Estado, Accion_Tomada, ID_Amenaza, ID_Dispositivo, ID_Usuario)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [Fecha_Inicio, Fecha_Fin, Descripcion, Estado, Accion_Tomada, ID_Amenaza, ID_Dispositivo, ID_Usuario],
    function (err) {
      if (err) {
        console.error('Error al agregar incidente:', err.message);
        return res.status(500).send('Error al agregar incidente');
      }
      res.json({ ID_Incidente: this.lastID });
    }
  );
});

// Ruta para eliminar un incidente por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Incidente WHERE ID_Incidente = ?';
  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error al eliminar incidente:', err.message);
      return res.status(500).send('Error al eliminar incidente');
    }
    if (this.changes === 0) {
      return res.status(404).send('Incidente no encontrado');
    }
    res.json({ message: 'Incidente eliminado correctamente' });
  });
});

module.exports = router;
