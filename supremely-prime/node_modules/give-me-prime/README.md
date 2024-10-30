give-me-prime
=========

A node module to deal with prime related stuff.


## Installation

    npm install give-me-prime --save

## Usage

````
    var gmp = require('../index');
    var isPrime = gmp.isPrime;
    var getPrimes = gmp.find;

    isPrime(10); // false
    isPrime(11); // true

    getPrimes(100);

    /*
      {
        primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97],
        sum: 1060
      }

    */
```

## Tests

    npm test


## Release History

* 0.1.0 Initial release
