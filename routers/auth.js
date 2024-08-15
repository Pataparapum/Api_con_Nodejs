import express from "express";
import jwt from 'jsonwebtoken';
import * as userControl from "../controllers/users.js"

const router = express.Router();

userControl.registerUser('bettatech', '1234');


router.route('/')
    .get((req, res) => {
        res.send('Auth router');
    });

router.route('/login')
    .post((req, res) => {
        if (!req.body) {
            return res.status(400).json({message: 'Missing data 1'});
        } else if (!req.body.user || !req.body.password) {
            return res.status(400).json({message:req.body})
        }
    
        userControl.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
            if ( err || !result) {
                return res.status(401).json({message: result})
            }
            //Si son validos, generamos un jwt y lo devolvemos
            const token = jwt.sign({userId: result}, 'secretPassword');
            
            res.status(200).json(
                {token: token}
            )
        })
    });

    export {router}