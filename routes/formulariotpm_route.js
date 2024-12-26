const express = require('express');
const { mostrarPuntosTPM, subirDatosTPM } = require('../controllers/formulariotpm_controller');


const router = express.Router();

// Ruta para procesar el formulario
router.get('/:id_cuarto/:id_equipo', mostrarPuntosTPM);

router.post('/tpm-upload', subirDatosTPM);

module.exports = router;