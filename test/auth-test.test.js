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
            .get('/team')
            .end((err, res) => {
                assert.equal(res.statusCode, 401);
                done()
            })
    })
    it('should return 200 when jwt is valid', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        request(app)
            .post('/login')
            .end((err,res) => {
                request(app)
                    .get('/tem')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200);
                        done()
                    })
        
            })
    })
})