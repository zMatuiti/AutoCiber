router.get('/api/integraciones', (req, res) => {
  db.all('SELECT * FROM Integracion', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener integraciones:', err.message);
      res.status(500).send('Error al obtener integraciones');
    } else {
      res.json(rows);
    }
  });
});
