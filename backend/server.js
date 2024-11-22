const express = require('express');
const integracionesRouter = require('./routes/integraciones');
const cors = require('cors');

const app = express();
const PORT = 5000; // Cambia el puerto si es necesario

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use(integracionesRouter);

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
