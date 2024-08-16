let teamsDatabase = {};

const bootstrapTeam = (userId) => {
    
    teamsDatabase[userId] = [];    
}

const cleanUpTeams = () => {
    for (let user in teamsDatabase) {
        teamsDatabase[user] = [];
    }
}

const getTeamOfUser = (userId) => {    
    return teamsDatabase[userId]
}
const addPokemon = (userId, pokemon) => {
    teamsDatabase[userId].push(pokemon);
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}

const deletePokemonForId = (userId, pokeId) => {
    teamsDatabase[userId].splice(pokeId, 1)
}

export {
    bootstrapTeam,
    cleanUpTeams,
    getTeamOfUser,
    addPokemon,
    setTeam,
    deletePokemonForId
}