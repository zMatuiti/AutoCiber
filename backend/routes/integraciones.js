const express = require('express');
const router = express.Router();
const db = require('../db'); // Importa la configuración de la base de datos

// Endpoint para obtener integraciones
router.get('/api/integraciones', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Integracion');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener integraciones:', error);
    res.status(500).send('Error al obtener integraciones');
  }
});

module.exports = router;
