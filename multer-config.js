const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  //destination: path.join(__dirname, 'public/uploads'),
  destination: function (req, file, cb) {
    cb(null, 'C:\\Users\\arman\\Desktop\\tpm-server-resources\\opl-images');//Lugar dónde se guardarán las imagenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único
  }
});


const upload = multer({
  storage: storage,
});

/*const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValid = allowedTypes.test(file.mimetype) && allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isValid) cb(null, true);
  else cb(new Error('Formato de archivo no válido.'));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Máximo: 2 MB
  fileFilter: fileFilter,
});*/

module.exports = upload;
