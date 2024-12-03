const express = require('express');
const router = express.Router();
const db = require('../data-base/db');

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

// Obtener todos los tipos de políticas
router.get('/tipo-politica', (req, res) => {
  db.all('SELECT Tipo FROM Tipo_politica', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener tipos de políticas:', err.message);
      res.status(500).send('Error al obtener tipos de políticas');
    } else {
      res.json(rows.map((row) => row.Tipo));
    }
  });
});

// Agregar una nueva política
router.post('/', (req, res) => {
  const { Nombre, Descripcion, Tipo, Fecha_implementacion, Activa } = req.body;

  if (!Nombre || !Descripcion || !Tipo || !Fecha_implementacion) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const query = `
    INSERT INTO Politica_seguridad (Nombre, Descripcion, Tipo, Fecha_implementacion, Activa)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [Nombre, Descripcion, Tipo, Fecha_implementacion, Activa], function (err) {
    if (err) {
      console.error('Error al agregar política:', err.message);
      return res.status(500).send('Error al agregar política');
    }
    res.json({ ID_politica: this.lastID });
  });
});

// Eliminar una política
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Politica_seguridad WHERE ID_politica = ?';
  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error al eliminar política:', err.message);
      res.status(500).send('Error al eliminar política');
    } else if (this.changes === 0) {
      res.status(404).send('Política no encontrada');
    } else {
      res.json({ message: 'Política eliminada correctamente' });
    }
  });
});

// Actualizar el estado de una política
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Activa } = req.body;

  if (Activa === undefined) {
    return res.status(400).send('El campo Activa es obligatorio');
  }

  const query = 'UPDATE Politica_seguridad SET Activa = ? WHERE ID_politica = ?';
  db.run(query, [Activa, id], function (err) {
    if (err) {
      console.error('Error al actualizar el estado de la política:', err.message);
      res.status(500).send('Error al actualizar el estado de la política');
    } else if (this.changes === 0) {
      res.status(404).send('Política no encontrada');
    } else {
      res.json({ message: 'Estado de la política actualizado correctamente' });
    }
  });
});
module.exports = router;
