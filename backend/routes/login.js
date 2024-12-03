const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../data-base/db'); // Conexión a la base de datos

// Ruta para manejar el login
router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Por favor, completa todos los campos.' });
  }

  const query = 'SELECT * FROM Usuario WHERE Email = ?';
  db.get(query, [email], async (err, row) => {
    if (err) {
      console.error('Error al autenticar usuario:', err.message);
      return res.status(500).json({ success: false, message: 'Error del servidor' });
    }

    if (!row) {
      return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    try {
      // Comparar la contraseña ingresada con la almacenada
      const isMatch = await bcrypt.compare(password, row.Pw);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
      }

      res.json({ success: true, message: 'Login exitoso', user: row });
    } catch (err) {
      console.error('Error al comparar contraseñas:', err.message);
      res.status(500).json({ success: false, message: 'Error del servidor' });
    }
  });
});

module.exports = router;
