import express, { response } from "express";
import passport from "passport";
import auth from "../myAPI/auth.js";
import * as teamsController from "../controllers/teams.js"
import { getUser } from "../controllers/users.js";
import axios from "axios";

const router = express.Router();
auth(passport)

router.route('/')
    .get( passport.authenticate('jwt',{session:false}), (req, res) => {
        let user = getUser(req.user.userId);
        res.status(200).json({
            trainer: user.userName,
            team: teamsController.getTeamOfUser(req.user.userId)
        })
})
    .put( passport.authenticate('jwt', {session:false}), (req, res) => {
        teamsController.setTeam(req.user.userId, req.body.team)
        res.status(200).send();
})


router.route('/pokemons')
    .post( passport.authenticate('jwt', {session: false}), (req, res) => {
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

    })

router.route('/pokemons/:pokeid')
    .delete (passport.authenticate('jwt', {session:false}), (req,res) =>  {
        if (!req.params) {
            return res.status(400).json({message: 'Need an id'});
        }

        teamsController.deletePokemonForId(req.user.userId, req.params.pokeid);
        res.status(200).send('Hello World!')
    
    })

export { router }