const jwt = require('jwt-simple');
const moment = require('moment');
const HttpResp = require('../helpers/http-responses');

const validToken = (req, res, next) => {
    if (!req.headers.authorization) return HttpResp.display403Error(res);
    let token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, process.env.SECRETKEYORPRIVATEKEY);
        if (payload.exp <= moment().unix()) return HttpResp.display403Error(res);
    } catch (err) {
        return HttpResp.display403Error(res);
    }
    req.user = payload
    next();
}

module.exports = {
    validToken
}
