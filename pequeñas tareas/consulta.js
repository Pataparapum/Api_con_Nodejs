fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur")
    .then(response => response.json())
    .then(json => {
        console.log("Nombre: " + json["species"]["name"]);
        console.log("Habilidades:");
        
        for (let index = 0; index < 2; index++) {
            console.log(`   ${index + 1}-` + json["abilities"][`${index}`]["ability"]["name"]);
        }
        console.log("Tipo: " + json["types"]["0"]["type"]["name"]);
        
        
        
        
        
    });
        