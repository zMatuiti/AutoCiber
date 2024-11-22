const express = require('express');
const router = express.Router();
const db = require('../db'); // Conexión a la base de datos

// Obtener todos los usuarios
router.get('/api/usuarios', (req, res) => {
  db.all('SELECT ID_usuario, Nombre, Rol, Email, Fecha_creacion FROM Usuario', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener usuarios:', err.message);
      res.status(500).send('Error al obtener usuarios');
    } else {
      res.json(rows);
    }
  });
});

// Agregar un nuevo usuario
router.post('/api/usuarios', (req, res) => {
  const { Nombre, Rol, Email, Pass, Fecha_creacion } = req.body;

  // Validación para campos obligatorios
  if (!Nombre || !Rol || !Email || !Pass || !Fecha_creacion) {
    return res.status(400).send('Por favor, completa todos los campos.');
  }

  const query = `
    INSERT INTO Usuario (Nombre, Rol, Email, Pass, Fecha_creacion) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [Nombre, Rol, Email, Pass, Fecha_creacion], function (err) {
    if (err) {
      console.error('Error al agregar usuario:', err.message);
      res.status(500).send('Error al agregar usuario');
    } else {
      res.json({ ID_usuario: this.lastID });
    }
  });
});

module.exports = router;
