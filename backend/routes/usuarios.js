const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../data-base/db'); // Conexión a la base de datos

const saltRounds = 10; // Nivel de encriptación

// Obtener todos los usuarios
router.get('/', (req, res) => {
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
router.post('/', async (req, res) => {
  const { Nombre, Rol, Email, Pw, Fecha_creacion } = req.body;

  // Validación de campos requeridos
  if (!Nombre || !Rol || !Email || !Pw || !Fecha_creacion) {
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
      const hashedPwword = await bcrypt.hash(Pw, saltRounds);

      const query = `
        INSERT INTO Usuario (Nombre, Rol, Email, Pw, Fecha_creacion) 
        VALUES (?, ?, ?, ?, ?)
      `;

      db.run(query, [Nombre, Rol, Email, hashedPwword, Fecha_creacion], function (err) {
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

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT Rol FROM Usuario WHERE ID_usuario = ?';
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al buscar usuario' });
    }

    if (!row) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    if (row.Rol === 'administrador') {
      return res.status(403).json({ success: false, message: 'No se puede eliminar al administrador' });
    }

    // Eliminar el usuario
    const deleteQuery = 'DELETE FROM Usuario WHERE ID_usuario = ?';
    db.run(deleteQuery, [id], function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error al eliminar usuario' });
      }

      res.json({ success: true, message: 'Usuario eliminado correctamente' });
    });
  });
});


// Endpoint para obtener todos los roles
router.get('/api/roles', (req, res) => {
  db.all('SELECT Rol FROM Rol_Usuario', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener roles:', err.message);
      res.status(500).json({ success: false, message: 'Error al obtener roles.' });
    } else {
      res.json(rows.map(row => row.Rol)); // Devolver solo los nombres de los roles
    }
  });
});
module.exports = router;
