import multer from 'multer';
import path from 'path';

// Configurar almacenamiento
const storage = multer.diskStorage({
  // Dónde guardar
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  // Nombre único: timestamp-nombre.jpg
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// Solo aceptar imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Solo imágenes permitidas'));
  }
};

// Crear middleware
export const subirImagen = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB máximo
});