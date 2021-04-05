const Image = require('../models/image.model');
const HttpResp = require('../helpers/http-responses');

/** Verifica que el usuario sea dueño del post */
const validateSessionImage = async (req, res, next) => {
    const { id } = req.params;
    const image = await Image.findOne({ _id: id, user: req.user.sub });
    if ( !image ) return HttpResp.display403Error(res);
    next();
}

module.exports = {
    validateSessionImage
}