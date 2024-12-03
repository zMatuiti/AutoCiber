const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Para manejar CORS

const usuariosRouter = require('./routes/usuarios');
const loginRouter = require('./routes/login');
const integracionesRouter = require('./routes/integraciones');
const incidentesRouter = require('./routes/incidentes');
const dispositivosRouter = require('./routes/dispositivos');
const politicasRouter = require('./routes/politicas');
const reportesRouter = require('./routes/reportes');


const app = express();

app.use(cors()); // Permitir CORS
app.use(bodyParser.json()); // Parsear JSON

app.use('/api', usuariosRouter);
app.use('/api/login', loginRouter);
app.use('/api/integraciones', integracionesRouter);
app.use('/api/incidentes', incidentesRouter);
app.use('/api/dispositivos', dispositivosRouter);
app.use('/api/politicas', politicasRouter);
app.use('/api/reportes', reportesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Servidor corriendo correctamente' });
});


const PORT = 5000; // Puedes cambiar este puerto si es necesario
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
