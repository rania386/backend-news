const multer = require('multer');
const path = require('path');
const fs = require('fs');
var storage = multer.diskstorage(
    {
        DestinationNode: function(req , res , cb){
            cb(null, "public/files")
        },
        filename: function(req , res , cb){
            const aploadPath = 'public/files'
            const originalName = file.originalname;
            const fileExtension = path.extname(originalName);
            const filename = originalName
            const fileIndex = 1;
            while(fs.existsSync(path.join(aploadPath, filename))){
                const basename = path.basename(originalName, fileExtension)
                fileName = '${baseName}_${fileIndex}${fileExtension';
                fileIndex++;
            }
            cb (null, fileName)
        }

    
    })
    const uploadfile = multer({storage : storage})
    module.exports = uploadfile