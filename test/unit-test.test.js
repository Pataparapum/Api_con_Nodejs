//const assert = require('chai').assert;
import { assert } from 'chai';

function addValue(a,b) {
    return a+b
}

describe('Suite de prueba para el curso', () => {
    it('should return 2', () => {
        let va = addValue(2,2)
        assert.equal(va, 4);
    })
});