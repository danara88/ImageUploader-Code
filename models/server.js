const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { connectDB } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Rutas del api 
        this.userRoutes = '/api/users';
        this.imageRoutes = '/api/images';

        // Ejecutar la conexión a base de datos
        this.connDB();

        // Ejecutar los middlewares
        this.middlewares();

        // Ejecutar las rutas
        this.routes();

    }

    async connDB() {
        await connectDB();
    }

    middlewares() {
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes() {
        this.app.use(this.userRoutes, require('../routes/user.routes'));
        this.app.use(this.imageRoutes, require('../routes/image.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port', this.port);
        })
    }

}

module.exports = Server;