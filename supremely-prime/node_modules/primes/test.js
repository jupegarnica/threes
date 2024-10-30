'use strict';

var assert = require('assert');
var primes = require('./');

describe('primes(20)', function(){
  it('gets prime numbers lte to 20', function(){
    var res = primes(20);
    assert.equal(res[0], 2);
    assert.equal(res[1], 3);
    assert.equal(res[3], 7);
  });
});

describe('primes(10, 20)', function(){
  it('gets prime numbers gte to 10 and lte to 20', function(){
    var res = primes(10, 20);
    assert.equal(res[0], 11);
    assert.equal(res[1], 13);
    assert.equal(res[2], 17);
  });
});

describe('primes(20, 10)', function(){
  it('gets prime numbers gte to 10 and lte to 20', function(){
    var res = primes(20, 10);
    assert.equal(res[0], 11);
    assert.equal(res[1], 13);
    assert.equal(res[2], 17);
  });
});

describe('primes(17, 17)', function(){
  it('returns an array with one index of 17', function(){
    var res = primes(17, 17);
    assert.equal(res[0], 17);
  });
});

describe('primes(20, 20)', function(){
  it('returns an empty array', function(){
    var res = primes(20, 20);
    assert.equal(res[0], undefined);
  });
});

describe('primes(80, 100)', function(){
  it('gets prime numbers gte to 80 and lte to 100', function(){
    var res = primes(80, 100);
    assert.equal(res[0], 83);
    assert.equal(res[1], 89);
    assert.equal(res[2], 97);
  });
});
