const User = require('../models/user.model');
const Role = require('../models/role.model');

const repeatedEmail = async ( email ) => {
    const users = await User.find({ email });
    if (users.length > 0) throw new Error(`The email ${ email } is already taken.`);
}

const repeatedUsername = async ( username ) => {
    const users = await User.find({ username });
    if (users.length > 0) throw new Error(`The username ${ username } is already taken.`);
}

const repeatedUsernameUpdate = async ( username ) => {
    const users = await User.find({ username });
    if (users.length >= 2) throw new Error(`The username ${ username } is already taken.`);
}

const repeatedEmailUpdate = async ( email ) => {
    const users = await User.find({ email });
    if (users.length >= 2) throw new Error(`The email ${ email } is already taken.`);
}

const notValidPassoword = async ( password ) => {
    // Que tenga numeros
    const passwordNums = [];
    // Que tengas letras
    const passwordStrings = [];
    
    password.split("").forEach(letter => {
        if (!isNaN(letter)) {
            passwordNums.push(letter);
        } else {
            passwordStrings.push(letter);
        }
    });
    
    if ( passwordNums.length == 0 ) throw new Error('The password require numbers.');
    if ( passwordStrings.length == 0 ) throw new Error('The password require letters.');
}

const checkRole = async ( role = 'USER_ROLE' ) => {
    role = 'USER_ROLE';
    const roleDB = await Role.findOne({ name: role });
    if (!roleDB) throw new Error(`The role ${ role } is invalid.`);
}


module.exports = {
    repeatedEmail,
    repeatedUsername,
    notValidPassoword,
    checkRole,
    repeatedEmailUpdate,
    repeatedUsernameUpdate
}
