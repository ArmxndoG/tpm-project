const express = require('express');
const { mostrarPuntosTPM, subirDatosTPM } = require('../controllers/formulariotpm_controller');


const router = express.Router();
const upload = require('../multer-config')

// endpoint que obtiene los puntos asociados a un equipo
router.get('/:id_cuarto/:id_equipo', mostrarPuntosTPM);

//enpoint que sube el resultado de cada punto con su respectiva imagen y comentario si es necesario
router.post('/tpm-upload', upload.array('imagenes'), subirDatosTPM);


module.exports = router;