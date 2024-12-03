const express = require('express');
const router = express.Router();
const db = require('../data-base/db'); // Conexión a la base de datos

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Por favor, completa todos los campos.' });
  }

  const query = 'SELECT * FROM Usuario WHERE Email = ? AND Pw = ?';
  db.get(query, [email, password], (err, row) => {
    if (err) {
      console.error('Error al autenticar usuario:', err.message);
      res.status(500).json({ success: false, message: 'Error del servidor' });
    } else if (row) {
      // Devuelve un token ficticio
      res.json({
        success: true,
        message: 'Login exitoso',
        user: row,
        token: 'sample-auth-token',
      });
    } else {
      res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  });
});

module.exports = router;
