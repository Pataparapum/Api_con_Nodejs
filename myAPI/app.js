import express from "express";
import passport from "passport";
import auth from "./auth.js";
import jwt from 'jsonwebtoken';
import * as userControl from "../controllers/users.js"

const app = express();
const port = 3000;

console.log(auth);

auth(passport)

app.get('/', (req, res) => {
    /**
     * req es la request, la petición
     * res es la respuesta
     */
    console.log(req);
    
    res.send("Hello World!")
})

/**
 * Urls de la app, EndPoints
 */

/**
 * Comprobamos credeciales
 * si no son validas, error
 * si son validad, generamos un JWT y lo devolvemos
 */
app.post('/login', (req,res) => {
    //comprobamos credenciales
    userControl.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        if (!result) {
            return res.status(401).json({message: 'Invalid credentials'})
        }
        //Si son validos, generamos un jwt y lo devolvemos
        const token = jwt.sign({userId: req.body.user});
        
        res.status(200).json(
            {token: token}
        )
    })
});

app.post('/team/pokemons', () => {
    res.status(200).send('Hello World!')

});

app.get('/team', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).send('Hello World!')

});

app.delete('/team/pokemons/:pokeid', () => {
    res.status(200).send('Hello World!')

});

app.put('/team', () => {
    res.status(200).send('Hello World!')
});


/**
 * Ejecución del servidor
 */
app.listen(port, () => {
    console.log("Server started at port 3000");
    
});

export {app};