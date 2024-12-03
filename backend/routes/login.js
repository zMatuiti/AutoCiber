const express = require('express');
const router = express.Router();
const db = require('../data-base/db'); // Asegúrate de que la ruta a la base de datos es correcta

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Por favor, completa todos los campos.' });
  }

  const query = 'SELECT * FROM Usuario WHERE Email = ?';
  db.get(query, [email], (err, user) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).json({ success: false, message: 'Error del servidor' });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    // Aquí puedes validar la contraseña si está encriptada
    if (password !== user.Pass) {
      return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    res.json({ success: true, message: 'Login exitoso', user });
  });
});

module.exports = router;
