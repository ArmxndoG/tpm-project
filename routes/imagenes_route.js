const express = require('express');
const router = express.Router();
const {ImagenesPuntosController, upload} = require('../controllers/imagenes_controller')

// Ruta para subir una imagen asociada a un punto
router.post('/subir-imagenes/:id_punto', upload.array('imagenes',10), ImagenesPuntosController.subirImagenes);

// Ruta para obtener las imágenes asociadas a un punto
router.get('/imagenes/:id_punto', ImagenesPuntosController.obtenerImagenes);

module.exports = router;
