const { Router } = require('express');
const { check } = require('express-validator');
const api = Router();

const userController = require('../controllers/user.controller');

const validUserFields = require('../helpers/validate-user-fields');

const { validateFields, validToken } = require('../middlewares/');


/** Ruta para registrar al usuario */
api.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is required and with a minimum of 6 characters.').isLength({min: 6}),
    check('password').custom( validUserFields.notValidPassoword ),
    check('email').custom( validUserFields.repeatedEmail ),
    check('username').custom( validUserFields.repeatedUsername ),
    check('role').custom( validUserFields.checkRole ),
    validateFields
],userController.register);


/** Ruta para login del usuario */
api.post('/login', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], userController.login);


/** Ruta para eliminar un usuario */
api.delete('/', [
    validToken
], userController.delete);

module.exports = api;