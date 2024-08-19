import jwt from 'jsonwebtoken';
import * as userControl from "./users.controller.js"

const login = (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing Data'})
    }

    userControl.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        if ( err || !result) {
            return res.status(401).json({message: result})
        }
        //Si son validos, generamos un jwt y lo devolvemos
        let user = userControl.getUserIdFromUserName(req.body.user);
        const token = jwt.sign({userId: user.userId}, 'secretPassword')
        
        res.status(200).json(
            {token: token}
        )
    })
}

export {login}