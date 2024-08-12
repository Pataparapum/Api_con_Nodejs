const express = require('express');
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

app.listen(port, () => {
    console.log("Server started at port 3000");
    
});