import {v4 as uuidv4} from 'uuid';
import * as crypto from '../myAPI/crypto.js';

const userDatabase = {
    '001': {
        'password': '',
        'salt' : '',
        'userName': ''
    }
}
//  userId -> password

const registerUser = (userName, password) => {
    crypto.hashPassword(password, (err, result) => {
        //guardar en la base de datos nuestro usuario
        userDatabase[v4.v4] = {
            username: userName,
            password: result
        }
    })
}

const checkUserCredentials = (userId, password, done)  => {
    // comprobar que las credenciales son correctas
    let user = userDatabase[userId];
    crypto.comparePassword(password, user.password, done)
}

export {registerUser, checkUserCredentials}