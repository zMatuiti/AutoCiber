const express = require('express');
const router = express.Router();
const db = require('../db'); // Conexión a la base de datos

// Endpoint para manejar el login
router.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validar que los campos no estén vacíos
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Por favor, completa todos los campos.' });
  }

  // Consulta SQL para verificar credenciales
  const query = 'SELECT * FROM Usuario WHERE Email = ? AND Pass = ?';
  db.get(query, [email, password], (err, row) => {
    if (err) {
      console.error('Error al autenticar usuario:', err.message);
      res.status(500).json({ success: false, message: 'Error del servidor' });
    } else if (row) {
      // Usuario autenticado
      res.json({ success: true, message: 'Login exitoso', user: row });
    } else {
      // Credenciales incorrectas
      res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  });
});

module.exports = router;
