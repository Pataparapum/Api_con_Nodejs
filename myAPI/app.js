import express from "express";
const app = express();
const port = 3000;

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

app.post('/login', (req,res) => {
    
})
app.post('/team/pokemons', () => {
    res.status(200).send('Hello World!')

})

app.get('/team', (req, res) => {
    res.status(200).send('Hello World!')

})

app.delete('/team/pokemons/:pokeid', () => {
    res.status(200).send('Hello World!')

} )

app.put('/team', () => {
    res.status(200).send('Hello World!')
})


/**
 * Ejecución del servidor
 */
app.listen(port, () => {
    console.log("Server started at port 3000");
    
});

export {app};