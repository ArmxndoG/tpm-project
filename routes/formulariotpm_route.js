const express = require('express');
const { mostrarPuntosTPM, subirDatosTPM } = require('../controllers/formulariotpm_controller');
const upload = require('../multer-config')

const router = express.Router();

// Ruta para procesar el formulario
router.get('/:id_cuarto/:id_equipo', mostrarPuntosTPM);

//enpoint que sube el resultado de cada punto con su respectiva imagen y comentario si es necesario
router.post('/tpm-upload', upload.any(), subirDatosTPM);

module.exports = router;