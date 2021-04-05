const { Router } = require('express');
const { check } = require('express-validator');
const api = Router();

const ImageController = require('../controllers/image.controller');

const { imageExists } = require('../helpers/validate-image-fields');

const { validateSessionImage, validToken, validateFields } = require('../middlewares/');


/** Ruta para traer todas las imagenes del usuario */
api.get('/', [ validToken ], ImageController.getImages);

/** Ruta para subir las imágenes */
api.post('/', [ validToken ], ImageController.uploadImage);

/** Ruta para eliminar una imágen */
api.delete('/:id', [ 
  validToken,
  check('id').isMongoId(),
  check('id').custom( imageExists ),
  validateSessionImage,
  validateFields
], ImageController.deleteImage);

 /** Ruta para visualizar la imágem */
api.get('/my-image/:imageName', ImageController.getImage);



module.exports = api;