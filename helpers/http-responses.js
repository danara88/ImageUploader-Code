/*
*
* Funciones para mostrar mensajes de códigos de error http
*  500, 400, 404, 403, custom, unlink
*/

const fs = require('fs');

/*
* Respuestas personalizadas
*/

exports.display500Error = function(res){
    res.status(500).send({message: 'Server error. Please try it later.'});
}

exports.display404Error = function(res){
    res.status(404).send({message: 'Something went wrong. The content can not be reached.'});
}

exports.display400Error = function(res){
    res.status(400).send({message: 'Your request can not be interpreted.'});
}

exports.displayCustom = function(res, status, message){
    res.status(status).send({message});
}

exports.display403Error = function(res){
    res.status(403).send({message: 'Permission denied. You are not allow to stay on this area.'});
}

exports.removeUpload = function(res, status, message, imagePath) {
    fs.unlink(imagePath, (err) => {
        res.status(status).send({ message });
    });
}


/*
* Mensajes personalizados 
*/
exports.message500 = 'Server error. Please try it later.';
exports.message400 = 'Your request can not be interpreted.';
exports.message404 = 'Something went wrong. The content can not be reached.';
exports.message403 = 'Permission denied. You are not allow to stay on this area.';