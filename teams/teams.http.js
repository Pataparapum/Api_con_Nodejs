import axios from "axios";
import * as teamsController from './teams.controller.js';
import {getUser} from '../auth/users.controller.js';

const getTeamsFromUser = (req, res) => {
    let user = getUser(req.user.userId);
    res.status(200).json({
        trainer:user.userName,
        team: teamsController.getTeamOfUser(req.user.userId)
    });
}

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
}

const addPokemonToTeam = (req, res) => {
    let pokemonName = req.body.name;
    axios.get(` https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    .then(function (response) {
        let pokemon = {
            name: pokemonName,
            pokedexNumber: response.data.id
        }
        teamsController.addPokemon(req.user.userId, pokemon);
        res.status(200).send('Hello World!')
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).json({message:err});
    })
    .then(function () {

    });
}

const deletePokemonFromTeam = (req, res) => {
    if (!req.params) {
        return res.status(400).json({message: 'Need an id'});
    }

    teamsController.deletePokemonForId(req.user.userId, req.params.pokeid);
    res.status(200).send()
}

export {
    getTeamsFromUser,
    setTeamToUser,
    addPokemonToTeam,
    deletePokemonFromTeam
}

