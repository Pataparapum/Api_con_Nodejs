import {v4 as uuidV4} from 'uuid';
import * as crypto from '../tools/crypto.js';
import * as teams from '../teams/teams.controller.js'
let userDatabase = {};
//  userId -> password

const registerUser = (userName, password) => {
    let hashedPWd = crypto.hashPasswordSync(password)    
    let userId = uuidV4();
    //guardar en la base de datos nuestro usuario
    userDatabase[userId] = {
        userName: userName,
        password: hashedPWd
    }

    teams.bootstrapTeam(userId);
}

const cleanUpUsers = () => {
    userDatabase = {};
}

const getUser = (userId) => {
    return userDatabase[userId]
    
    
}

const getUserIdFromUserName = (userName) => {
    for (let user in userDatabase) {
        if (userDatabase[user].userName == userName) {
            let userData = userDatabase[user]
            userData.userId = user
            return userData;
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

export {
    registerUser,
    cleanUpUsers,
    checkUserCredentials, 
    userDatabase, 
    getUser, 
    getUserIdFromUserName
}