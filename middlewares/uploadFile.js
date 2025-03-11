const multer = require('multer');
const path = require('path');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files'); // Assure-toi que ce dossier existe
  },
  filename: function (req, file, cb) {
    const uploadPath = 'public/files';
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName);
    let fileName = originalName;

    // Vérifier si le fichier existe déjà
    let fileIndex = 1;
    while (fs.existsSync(path.join(uploadPath, fileName))) {
      const baseName = path.basename(originalName, fileExtension);
      fileName = `${baseName}_${fileIndex}${fileExtension}`;
      fileIndex++;
    }

    cb(null, fileName);

    // Correctement définir le chemin après la sauvegarde
    // Utiliser `req.file.path` pour le chemin du fichier
    req.file = req.file || {};  // Assurer que req.file est défini
    req.file.path = path.join(uploadPath, fileName); 
  }
});

var uploadfile = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Seuls les fichiers PDF sont autorisés !'), false);
    }
    cb(null, true);
  }
});

module.exports = uploadfile;
