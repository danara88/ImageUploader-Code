require('dotenv').config();

const Server = require('./models/server');

server = new Server();

server.listen();