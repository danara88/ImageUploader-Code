const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const HttpResp = require('../helpers/http-responses');
const { createToken } = require('../helpers/create-jwt');

const controller = {

    register: async (req, res) => {
        // Obtener los datos del usuario
        const { username, email, password } = req.body;

        // Crear la instancea del usuario
        const user = new User({ username, email, password });
        user.username = user.username.toLowerCase();
        user.email = user.email.toLowerCase();

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);
        user.password = hash;

        // Guardar el usuario
        await user.save();

        return res.status(200).json({ user });

    },

    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            // Encontrar al usuario por su nombre de usuario
            const user = await User.findOne({ username });
            if(!user) return HttpResp.displayCustom(res, 400, 'Incorrect username or password.');

            // Comparar la contraseña
            const verifyPassword = bcryptjs.compareSync(password, user.password);
            if (!verifyPassword) return HttpResp.displayCustom(res, 400, 'Incorrect username or password.');

            //  Generar el token
            const token = await createToken( user );

            return res.status(200).send({
                user,
                token
            });

        } catch (err) {
            return HttpResp.display500Error(res);
        }
    },


    delete: async (req, res) => {
        const user = await User.findByIdAndUpdate(req.user.sub, {status: false}, {new: true});
        return res.status(200).send({ user });
    }

}

module.exports = controller;