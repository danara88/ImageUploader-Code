const validateFields = require('../middlewares/validate-fields.js');
const validToken = require('../middlewares/validate-jwt');
const validateSessionImage = require('../middlewares/validate-session');

module.exports = {
    ...validateFields,
    ...validToken,
    ...validateSessionImage
}