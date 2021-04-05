const Image = require('../models/image.model');

const imageExists = async ( id ) => {
    const image = await Image.findById( id );
    if (!image) throw new Error(`The image does not exist.`);
}

module.exports = {
    imageExists
}