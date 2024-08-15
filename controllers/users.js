import {v4 as uuidV4} from 'uuid';
import * as crypto from '../myAPI/crypto.js';

const userDatabase = {};
//  userId -> password

const registerUser = (userName, password) => {
    let hashedPWd = crypto.hashPasswordSync(password)    

    //guardar en la base de datos nuestro usuario
    userDatabase[uuidV4()] = {
        userName: userName,
        password: hashedPWd
    }
}

const getUserIdFromUserName = (userName) => {
    for (let user in userDatabase) {
        if (userDatabase[user].userName == userName) {
            return userDatabase[user];
        }
    }
}

const checkUserCredentials = (userName, password, done)  => {
    console.log('cheking user credentials');
    
    // comprobar que las credenciales son correctas
    let user = getUserIdFromUserName(userName)
    
    if (user) {
        crypto.comparePassword(password, user.password, done)

    } else {
        done('Missing user')
    }
}

export {registerUser, checkUserCredentials, userDatabase}