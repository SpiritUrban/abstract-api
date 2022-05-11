// Multers disk storage settings
import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`)
});

// Multer settings
const upload = multer({storage}).single('file');

export default null;
