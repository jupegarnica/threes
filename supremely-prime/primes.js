var math = require('mathjs');
var numbers = require('numbers');
var bigint = require('bigint');
var getPrimes = numbers.prime.sieve;
// var isPrime = numbers.prime.millerRabin;
var isTrulyPrime = numbers.prime.simple
var MAXINT = 9007199254740992;
var isPrime = bigint.probPrime;
var nextPrime = bigint.nextPrime;
var digits = 99;
var minPrimes = getPrimes(10);
var primes = getPrimes(3181 + 7);
//create an array of digits plenty of 1s

function createOnesArray(d) {
    var arr = [];
    for(var i = 0; i < d; i++) {
        arr[i] = 1;
    }
    return arr;
};
// convert an array of digits to number
Array.prototype.makeStringNumber = function() {
    return this.join('') + '';
};
String.prototype.makeNumber = function() {
    return this * 1;
};

function digitalSumIsPrime(num) {
    var dig = num.toString().split(''),
        result = 0;
    dig.forEach(function(el) {
        result += parseInt(el);
    });
    return isPrime(result);
}

function digitalMultiplicationIsPrime(num) {
    var dig = num.toString().split(''),
        result = 1;
    dig.forEach(function(el) {
        result *= el;
    });
    return isPrime(result);
}
//extract the biggest prime from a prime long of digits

function primeToBiggestSupremlyPrime(prime) {
    var fakeSuPrime = [],
        fakeSuPrimeNum,
        length,
        surePrime;
    for(var j in minPrimes) {
        length = prime - minPrimes[j] + 1;
        for(var i = 0; i < length; i++) {
            fakeSuPrime = createOnesArray(length);
            fakeSuPrime[i] = minPrimes[j];
            fakeSuPrimeNum = fakeSuPrime.makeStringNumber();
            //                         console.log(
            //                             fakeSuPrimeNum,
            //                             'mult' , 
            //                             digitalMultiplicationIsPrime(fakeSuPrimeNum),
            //                             'Sum',
            //                             digitalSumIsPrime(fakeSuPrimeNum),
            //                             'Prime?',
            //                             isPrime(fakeSuPrimeNum)
            //                         );
            surePrime = isPrime(fakeSuPrimeNum);
            if(surePrime) {
                console.log('the number ' + fakeSuPrimeNum + ' is ' + surePrime + ' prime');
                return fakeSuPrimeNum;
            }
        }
    }
    return false;
}

function findSupremelyPrimes(from) {
    timer.start('supremely-prime');
    from = from || 3;
    var biggest = false,
        actualPrime = nextPrime(from).toNumber(),
        iteration = 1;
    global.logger = setInterval(function() {
        timer.split('supremely-prime');
        console.log(iteration, actualPrime);
    }, 60000); //log which prime are we checking every minute;
    while(!biggest) {
        console.log(iteration, actualPrime);
        biggest = primeToBiggestSupremlyPrime(actualPrime);
        //if found it before 1h keep looking for
        if(timer.split('supremely-prime') < 3600000) {
            biggest = false;
        }
        if(biggest) {
            clearInterval(global.logger);
            return biggest;
        }
        iteration += 1;
        actualPrime = nextPrime(actualPrime).toNumber();
    }
    clearInterval(logger);
    return false;
}
//Evaluating time
var timer = {
    _times: []
};
timer.start = function(label) {
    this._times[label] = Date.now();
};
timer.stop = function(label) {
    var time = this._times[label];
    if(!time) {
        throw new Error('No such label: ' + label);
    }
    var duration = Date.now() - time;
    console.log('%s: %dms', label, duration);
    return duration;
};
timer.split = timer.stop;
findSupremelyPrimes(4000);