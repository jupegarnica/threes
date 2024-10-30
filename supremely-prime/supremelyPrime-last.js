var math = require('mathjs');
var numbers = require('numbers');
var bigint = require('bigint');
// var fs = require('node-fs');
var getPrimes = numbers.prime.sieve;
// var isPrime = numbers.prime.millerRabin;
var isTrulyPrime = numbers.prime.simple
var MAXINT = 9007199254740992;
var isPrime = bigint.probPrime;
var nextPrime = bigint.nextPrime;
var DEADLINE = 1000 * 60 * 60 * 7.5; // 5 min
var suPrimesFound = 0;
var minPrimes = getPrimes(10);
var debug = true;
// var primes = getPrimes(3181 + 7);
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
//homebrew implementation of prime.millerRabin with bigint
// var isPrimeQuick = function(n, k) {
//     n = bigint(n);
//   if (arguments.length === 1) k = 20;
//   if (n.eq(2)) return true;
//   if ( n.le(1) || n.mod(2) === 0) return false;
//   var s = 0;
// //   var d = n - 1;
//   var d = n.sub(1);
//   while (true) {
// //     var dm = basic.divMod(d, 2);
//     var dm = [bigint(math.floor( math.bignumber((d.div(2)).toString()))), d.mod(2)];
//     var quotient = dm[0];
//     var remainder = dm[1];
//     if (remainder.eq(1)) break;
//     s += 1;
//     d = quotient;
//   }
//   var tryComposite = function (a) {
//       a = bigint(a);
//     if (bigint.powm(a, d, n).eq(1)) return false;
//     for (var i = 0; i < s; i ++) {
//       if (bigint.powm(a, bigint.pow(2, i).mul(d), n).eq(n.sub(1))) return false;
//     }
//     return true;
//   }
//   for (var i = 0; i < k; i++) {
// //     var a = 2 + Math.floor(Math.random() * (n - 2 - 2));
//     var a = bigint(math.floor( math.bignumber((n.sub(4)).mul(Math.random()).toString()) ).toString())
//     .add(2);  
//     if (tryComposite(a)) return false;
//   }
//   return true;
// };
// function digitalSumIsPrime(num) {
//     var dig = num.toString().split(''),
//         result = 0;
//     dig.forEach(function(el) {
//         result += parseInt(el);
//     });
//     return isPrime(result);
// }
// function digitalMultiplicationIsPrime(num) {
//     var dig = num.toString().split(''),
//         result = 1;
//     dig.forEach(function(el) {
//         result *= el;
//     });
//     return isPrime(result);
// }
//extract the biggest prime from a prime long of digits
// function primeToBiggestSupremlyPrime(prime) {
//     var fakeSuPrime = [],
//         fakeSuPrimeNum,
//         length,
//         surePrime;
//     for(var j in minPrimes) {
//         length = prime - minPrimes[j] + 1;
//         for(var i = 0; i < length; i++) {
//             fakeSuPrime = createOnesArray(length);
//             fakeSuPrime[i] = minPrimes[j];
//             fakeSuPrimeNum = fakeSuPrime.makeStringNumber();
//             surePrime = isPrime(fakeSuPrimeNum);
//             if(surePrime) {
//                 console.log('{' + i + '}' + minPrimes[j] + '{' + (length - i - 1) + '}');
//                 console.log(++suPrimesFound + ' found' );               
//                 console.log(fakeSuPrimeNum);
//                 return fakeSuPrimeNum;
//             }
//         }
//     }
//     return false;
// }
// function findSupremelyPrimes(from) {
//     timer.start('supremely-prime');
//     from = from || 3;
//     var biggest = false,
//         actualPrime = nextPrime(from).toNumber(),
//         iteration = 1;
//     while(!biggest) {
//         console.log(iteration, actualPrime);
//         biggest = primeToBiggestSupremlyPrime(actualPrime);
//         //if found it before 1h keep looking for
//         if(timer.split('supremely-prime') < DEADLINE) {
//             biggest = false;
//         }
//         if(biggest) {
//             timer.stop('supremely-prime');
//             return biggest;
//         } else {
//             iteration += 1;
//             actualPrime = nextPrime(actualPrime).toNumber();
//         }
//     }
//     return false;
// }
//check some

function primeToCheckSomeSupremlyPrime(prime) {
    var fakeSuPrime = [],
        fakeSuPrimeNum,
        length,
        surePrime,
        di,
        diTotal,
        diAverage;
    for(var j in minPrimes) {
        length = prime - minPrimes[j] + 1;
        //         diTotal = 0;
        //         diAverage = 0;
        //         debug && timer.start('iteration');
        for(var i = 0, k = 0; i < length; k++) {
            di = Math.ceil(Math.random() * length / 300); //check randomly around 100 iterations each
            //             diTotal += di;
            //             i += di;
            fakeSuPrime = createOnesArray(length);
            fakeSuPrime[i] = minPrimes[j];
            fakeSuPrimeNum = fakeSuPrime.makeStringNumber();
            surePrime = isPrime(fakeSuPrimeNum);
            if(surePrime) {
                console.log('{' + i + '}' + minPrimes[j] + '{' + (length - i - 1) + '}');
                console.log(++suPrimesFound + ' found');
                console.log(fakeSuPrimeNum);
                return fakeSuPrimeNum;
            }
        }
        //         diAverage = diTotal / k;
        //         debug && timer.split('iteration');
        //         debug && console.log('diAverage', diAverage);
    }
    //     debug && timer.stop('iteration');
    return false;
}

function findSomeSupremelyPrimes(from) {
    timer.start('start');
    from = from || 3;
    var biggest = false,
        actualPrime = nextPrime(from).toNumber(),
        iteration = 1;
    while(!biggest) {
        console.log(iteration, actualPrime);
        biggest = primeToCheckSomeSupremlyPrime(actualPrime);
        //if found it before 1h keep looking for
        if(timer.stop('start') < DEADLINE) {
            biggest = false;
        }
        if(biggest) {
            timer.split('start');
            return biggest;
        } else {
            iteration += 1;
            actualPrime = nextPrime(actualPrime).toNumber();
        }
    }
    return false;
}
// iteration mesure time
// 

function checkIterationTime(prime) {
    prime = nextPrime(prime);
    var fakeSuPrime = [],
        fakeSuPrimeNum,
        length,
        surePrime,
        di,
        diTotal,
        diAverage,
        foundTime = 0,
        averageFoundTime = 0,
        found;
    diTotal = 0;
    diAverage = 0;
    var k = 0;
    var l;
    for(l = prime; l > 10; l/= 2) {
        found = 0;
        foundTime  = 0;
        k= 0;
        timer.start('iteration' + l);
        for(var j in minPrimes) {
            length = prime - minPrimes[j] + 1;
            for(var i = 0; i < length; k++) {
                di = Math.ceil(Math.random() * length / l); //check randomly around 100 iterations each
                diTotal += di;
                i += di;
                fakeSuPrime = createOnesArray(length);
                fakeSuPrime[i] = minPrimes[j];
                fakeSuPrimeNum = fakeSuPrime.makeStringNumber();
                surePrime = isPrime(fakeSuPrimeNum);
                if(surePrime) {
                    ++found;
//                     console.log('{' + i + '}' + minPrimes[j] + '{' + (length - i - 1) + '}');
//                     console.log(found + ' found');
                    //console.log(fakeSuPrimeNum);
                    foundTime += timer.split('iteration' + l,true);
                    //return fakeSuPrimeNum;
                }
            }
        }
        averageFoundTime = foundTime / found;
        timer.stop('iteration' + l,true);
        found && console.log('averageFoundTime ', averageFoundTime/1000/60, 'SPfound', found, 'diAverage', diAverage, 'iterations', k);
        diAverage = diTotal / k;
    }
    return false;
}
//Evaluating time
var timer = {
    _times: []
};
timer.start = function(label) {
    this._times[label] = {
        start: Date.now(),
        split: Date.now()
    }
};
timer.stop = function(label,nolog) {
    nolog = nolog ? true : false;
    var time = this._times[label];
    if(!time) {
        throw new Error('No such label: ' + label);
    }
    var duration = Date.now() - time.start;
    nolog || console.log('%s: %d minutes', label, duration / 1000 / 60);
    timer.split(label);
    return duration;
};
timer.split = function(label,nolog) {
    nolog = nolog ? true : false;
    var _label = this._times[label];
    if(!_label) {
        throw new Error('No such label: ' + label);
    }
    var split = _label.split;
    var duration = Date.now() - split;
    nolog || console.log('%s: %d minutes', label + ' split', duration / 1000 / 60);
    this._times[label].split = Date.now();
    return duration;
};
checkIterationTime(process.argv[2]);
// findSomeSupremelyPrimes(process.argv[2]);