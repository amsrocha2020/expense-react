const path = require('path');
const ImageUser = require('../Models/ImageUser');

exports.uploadFile = async (req, res, next) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
      const file = req.files.file;
      let reqPath = path.join(__dirname, '../');

      file.mv(`${reqPath}/client/public/uploads/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
       
      });
}