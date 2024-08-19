import { assert } from 'chai';  // Using Assert style
import { app } from '../../myAPI/app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest'
import * as userControl from '../../auth/users.controller.js'
import * as teamsControl from '../teams.controller.js'

use(superagent());

before( (done) => {
    userControl.registerUser('bettatech', '1234');
    userControl.registerUser('mastermind', '4321');
    done()
});

beforeEach((done) => {
    teamsControl.cleanUpTeams();
    done();
});

describe('Suite de pruebas teams', () => {
    it ('should return team of the given user', (done) => {
        let team = [{name: 'Charizard'}, {name:'Blastoise'}]
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'mastermind', password: '4321'})
            .end((err,res) => {
                let token = res.body.token;
                //Expect valid login
                assert.equal(res.statusCode, 200);
                request(app)
                    .put('/teams')
                    .send({
                        team:team
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // Tiene quipo con Charizard y Blastoise
                                // { trainer : 'bettatech, team: {pokemons} }
                                
                                assert.equal(res.statusCode, 200);
                                assert.equal(res.body.trainer, 'mastermind');
                                assert.equal(res.body.team.length, team.length);
                                assert.equal(res.body.team[0].name, team[0].name);
                                assert.equal(res.body.team[1].name, team[1].name);
                                done()
                    });
                });
            });
    });

    it ('should return the pokedex number', (done) => {
        let pokemonName = 'Bulbasaur'
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'mastermind', password: '4321'})
            .end((err,res) => {
                let token = res.body.token
                //Expect valid login
                assert.equal(res.statusCode, 200);
                request(app)
                    .post('/teams/pokemons')
                    .send({name:pokemonName})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // Tiene quipo con Charizard y Blastoise
                                // { trainer : 'bettatech, team: {pokemons} }
                                assert.equal(res.statusCode, 200);
                                assert.equal(res.body.trainer, 'mastermind');
                                assert.equal(res.body.team.length, 1);
                                assert.equal(res.body.team[0].name, pokemonName);
                                assert.equal(res.body.team[0].pokedexNumber, 1);
                                done()
                    });
                });
            });
    });

    it ('should delete a pokemon of the user team', (done) => {
        let team = [{name: 'Charizard'}, {name:'Blastoise'}]
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'mastermind', password: '4321'})
            .end((err,res) => {
                let token = res.body.token
                //Expect valid login
                assert.equal(res.statusCode, 200);
                request(app)
                    .put('/teams')
                    .send({team:team})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        request(app)
                            .delete('/teams/pokemons/1')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => { 
                                request(app)
                                    .get('/teams')
                                    .set('Authorization', `JWT ${token}`)
                                    .end((err, res) => {
                                        //debe eliminar al segundo pokemon del equipo
                                        //{trainer: "mastermind", team:{name:"Charizard"}}

                                        assert.equal(res.statusCode, 200);
                                        assert.equal(res.body.trainer, 'mastermind');
                                        assert.equal(res.body.team.length, 1);
                                        assert.equal(res.body.team[0].name, 'Charizard');
                                        done()
                                    });
                                });
                        });
                });
        });
});

after((done) => {
    userControl.cleanUpUsers();
    done();
})