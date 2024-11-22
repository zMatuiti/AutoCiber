const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa CORS al inicio
const usuariosRouter = require('./routes/usuarios');
const loginRouter = require('./routes/login');

const app = express();
const PORT = 5000;

app.use(cors());

// Configura body-parser para solicitudes JSON
app.use(bodyParser.json());

// Rutas
app.use(usuariosRouter);
app.use(loginRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
