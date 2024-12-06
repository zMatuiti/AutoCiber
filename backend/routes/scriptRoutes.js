const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    const scriptPath = path.join(__dirname, '../data-base/testing.py');

    exec(`python ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Errores del script: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }
        res.json({ message: 'Script ejecutado con éxito', output: stdout });
    });
});

module.exports = router;
