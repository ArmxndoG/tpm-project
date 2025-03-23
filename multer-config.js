const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Carpeta base para recursos
//const BASE_RESOURCE_PATH = 'C:\\Users\\GHH1SLP\\Desktop\\tpm-server-resources';
const BASE_RESOURCE_PATH = 'C:\\Users\\arman\\Desktop\\tpm-server-resources';


// Función para crear el storage de Multer con destino dinámico
const createStorage = (subFolder) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      // Crear la ruta completa
      const fullPath = path.join(BASE_RESOURCE_PATH, subFolder);
      
      // Crear el directorio si no existe
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único
    }
  });
};

// Configuraciones de upload específicas
const uploadOPL = multer({ storage: createStorage('opl-images') });
const uploadAyudasVisuales = multer({ storage: createStorage('ayudas-visuales') });
const uploadHeaderImages = multer({ storage: createStorage('headers-img') });

module.exports = {
  uploadOPL,
  uploadAyudasVisuales,
  uploadHeaderImages
};

/*const storage = multer.diskStorage({
  //destination: path.join(__dirname, 'public/uploads'),
  destination: function (req, file, cb) {
    cb(null, 'C:\\Users\\GHH1SLP\\Desktop\\tpm-server-resources\\opl-images');//Lugar dónde se guardarán las imagenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único
  }
});


const upload = multer({
  storage: storage,
});


module.exports = upload;*/

