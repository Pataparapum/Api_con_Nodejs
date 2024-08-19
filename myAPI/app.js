import express from "express";
import * as middlewares from "../middlewares.js";
//routes
import { router as authRoutes } from "../auth/auth.router.js";
import {router as teamsRoutes } from "../teams/teams.router.js";

const app = express();

const port = 3000;

middlewares.setupMiddlewares(app);
app.get('/', (req, res) => {
    /**
     * req es la request, la petición
     * res es la respuesta
     */
    
    res.send('Hello World!')
})

app.use('/auth', authRoutes)
app.use('/teams', teamsRoutes)


/**
 * Ejecución del servidor
 */
app.listen(port, () => {
    console.log("Server started at port 3000");
    
});

export {app};