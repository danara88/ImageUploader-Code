const Image = require('../models/image.model');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const HttpResp = require('../helpers/http-responses');

const controller = {

    getImages: async (req, res) => {
        const images = await Image.find({ user: req.user.sub }).sort('-createdAt');
        return res.status(200).send({ images });
    },

    
    uploadImage: async (req, res) => {
        // Comprobar que me llegue un archivo
        if ( !req.files || Object.keys(req.files).length === 0 || !req.files.image) {
            return res.status(400).send({ message: 'Not files to upload' });
        }
        // Capturamos el archivo subido
        const { image } = req.files;
        // Creamor la ruta donde vamos a guardar la imagen
        const uploadPath = path.join(__dirname, '../uploads/images/', image.name);
        image.mv(uploadPath, async (err) => {
            if (err) return res.status(500).send({ err });
               
            // Guardar la imagen en la base de datos
            const imageObj = new Image({user: req.user.sub, path: image.name, createdAt: moment().unix()});
            await imageObj.save();
            return res.status(200).send({ image: imageObj });
        });
    },


    getImage: (req, res) => {
        const { imageName } = req.params;
        const pathFile = `./uploads/images/${ imageName }`;
        const fileExists = fs.existsSync(pathFile);
        if ( fileExists ) {
            return res.sendFile(path.resolve(pathFile));
        } else {
            return HttpResp.displayCustom(res, 404, 'The file does not exist.');
        }
    },

    
    deleteImage: async (req, res) => {
        const { id } = req.params;
        const image = await Image.findByIdAndDelete(id);
        const pathFile = `./uploads/images/${ image.path }`;
        return HttpResp.removeUpload(res, 200, 'The file has been removed', pathFile);
    }

}

module.exports = controller;