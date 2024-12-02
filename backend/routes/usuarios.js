const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../data-base/db'); // Conexión a la base de datos

const saltRounds = 10; // Nivel de encriptación

// Obtener todos los usuarios
router.get('/usuarios', (req, res) => {
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
router.post('/api/usuarios', async (req, res) => {
  const { Nombre, Rol, Email, Pass, Fecha_creacion } = req.body;

  // Validación de campos requeridos
  if (!Nombre || !Rol || !Email || !Pass || !Fecha_creacion) {
    return res.status(400).json({ success: false, message: 'Por favor, completa todos los campos.' });
  }

  // Validar formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(Email)) {
    return res.status(400).json({ success: false, message: 'El correo electrónico no es válido.' });
  }

  // Verificar si el email ya está registrado
  db.get('SELECT * FROM Usuario WHERE Email = ?', [Email], async (err, row) => {
    if (err) {
      console.error('Error al verificar email:', err.message);
      return res.status(500).json({ success: false, message: 'Error del servidor.' });
    }
    if (row) {
      return res.status(400).json({ success: false, message: 'El correo electrónico ya está registrado.' });
    }

    try {
      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(Pass, saltRounds);

      const query = `
        INSERT INTO Usuario (Nombre, Rol, Email, Pass, Fecha_creacion) 
        VALUES (?, ?, ?, ?, ?)
      `;

      db.run(query, [Nombre, Rol, Email, hashedPassword, Fecha_creacion], function (err) {
        if (err) {
          console.error('Error al agregar usuario:', err.message);
          return res.status(500).json({ success: false, message: 'Error al agregar usuario.' });
        }
        res.json({ success: true, data: { ID_usuario: this.lastID } });
      });
    } catch (err) {
      console.error('Error al procesar la contraseña:', err.message);
      res.status(500).json({ success: false, message: 'Error al procesar la contraseña.' });
    }
  });
});

module.exports = router;
