import express from "express";
import passport from "passport";
import auth from "../myAPI/auth.js";
const router = express.Router();

auth(passport)

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => {
        res.status(200).send('Hello World!')
})
    .put( () => {
    res.status(200).send('Hello World!')
})

router.route('/pokemons')
    .post( () => {
        res.status(200).send('Hello World!')
    })

router.route('/pokemons/:pokeid')
    .delete (() => {
        res.status(200).send('Hello World!')
    
    })

export { router }