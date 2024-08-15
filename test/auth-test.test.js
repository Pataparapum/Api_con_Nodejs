import { assert } from 'chai';  // Using Assert style
import { app } from '../myAPI/app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest'

use(superagent());

describe('Suite de pruebas auth', () => {
    it('should return 401 no jwt token available', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        request(app)
            .get('/teams')
            .end((err, res) => {
                assert.equal(res.statusCode, 401);
                done()
            })
    })

    it ('should return 400 when no data is provided', (done) => {
        request(app)
            .post('/auth/login')
            .end((err, res) => {
                //Expect valid login
                assert.equal(res.statusCode, 400);
                done()
            });
    });

    it ('should return 200 and token for succesful login', (done) => {
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user:'bettatech', password:'1234'})
            .end((err, res) => {
                //Expect valid login
                assert.equal(res.statusCode, 200);
                done()
            });
    });
    
    it('should return 200 when jwt is valid', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'bettatech', password: '1234'})
            .end((err,res) => {
                //Expect valid login
                assert.equal(res.statusCode, 200);
                request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200);
                        done()
                    });
            });
    });
});