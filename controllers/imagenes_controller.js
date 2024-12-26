const PuntosEquipo = require('../models/imagenes_model');


const multer = require('multer');
const path = require('path');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para cada archivo
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif).'));
    }
  }
});


const ImagenesPuntosController = {
  // Subir una imagen
  // Subir imágenes asociadas a un punto
  subirImagenes: async (req, res) => {
    try {

      const { id_punto } = req.params; // ID del punto asociado desde la URL
      const rutaImagen = `/uploads/${req.files[0].filename}`;
      const result = await PuntosEquipo.agregarImagen(id_punto,rutaImagen); //ejecutar el método del modelo
      res.status(200).json(result)

    } catch (error) {
      console.error('Error al subir las imágenes:', error);
      res.status(500).json({ success: false, message: 'Error al subir la imagen.', error: error.message });
    }
  },


  // Obtener imágenes por punto
  obtenerImagenes: async (req, res) => {
    try {
      const { id_punto } = req.params;
      const result = await PuntosEquipo.obtenerImagenesPorPunto(id_punto);
      

      if (rows.length > 0) {
        const imagenes = JSON.parse(rows[0].ayuda_visual || '[]');
        res.status(200).json({ success: true, imagenes });
      } else {
        res.status(404).json({ success: false, message: 'Punto no encontrado.' });
      }
    } catch (error) {
      console.error('Error al obtener imágenes del punto:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener imágenes.',
        error: error.message
      });
    }
  }
};


module.exports = {
   upload,
   ImagenesPuntosController
}
    










/*const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../imagenes'),
    
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })
exports.upload = upload.single('image');

exports.uploadFile = (req,res) =>{
    req.getConnection(err,conn() =>{
        if(err) return res.send(err)
    })
}*/