import express from "express";
import jwt from 'jsonwebtoken';
import * as userControl from "./users.controller.js"
import * as teamControl from '../teams/teams.controller.js'

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send('Auth router');
    });

router.route('/login')
    .post((req, res) => {
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
    });

    export {router}