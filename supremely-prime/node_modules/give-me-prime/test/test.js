var expect = require('chai').expect;
var gmp = require('../index');
var isPrime = gmp.isPrime;
var getPrimes = gmp.find;

describe('#isPrime', function() {
  it('return true if number is a prime', function() {
    expect(isPrime(11)).to.be.true;
  });
  it('return false if number is NOT a prime', function() {
    expect(isPrime(10)).to.be.false;
  });
});

