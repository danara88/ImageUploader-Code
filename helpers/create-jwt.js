const jwt = require('jwt-simple');
const moment = require('moment');

const createToken = ( user ) => {
    return new Promise((resolve, reject) => {
        const payload = {
            sub: user._id,
            email: user.email,
            iat: moment().unix(),
            exp: moment().add(1, 'days').unix()
        }
    
        const token = jwt.encode(payload, process.env.SECRETKEYORPRIVATEKEY);
        if ( token ) {
            resolve(token);
        } else {
            reject('The token could not be generated.');
        }
    });
}

module.exports = {
    createToken
}