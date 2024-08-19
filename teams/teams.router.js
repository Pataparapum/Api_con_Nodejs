import express, { response } from "express";
const router = express.Router();

import * as teamsHttpHandler from './teams.http.js';

router.route('/')
    .get(teamsHttpHandler.getTeamsFromUser)
    .put(teamsHttpHandler.setTeamToUser)

router.route('/pokemons')
    .post(teamsHttpHandler.addPokemonToTeam)

router.route('/pokemons/:pokeid')
    .delete (teamsHttpHandler.deletePokemonFromTeam)

export { router }