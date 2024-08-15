import express from "express";
import bodyParser from 'body-parser';

//routes
import { router as authRoutes } from "../routers/auth.js";
import {router as teamsRoutes } from "../routers/teams.js";

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
    /**
     * req es la request, la petición
     * res es la respuesta
     */
    
    res.send('Hello World!')
})

/**
 * Urls de la app, EndPoints
 */

app.use('/auth', authRoutes)
app.use('/teams', teamsRoutes)


/**
 * Ejecución del servidor
 */
app.listen(port, () => {
    console.log("Server started at port 3000");
    
});

export {app};