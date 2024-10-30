/**
 * test the number Primality
 *
 * @param  {number} any number
 * @return {number}
 */


module.exports = new Primes();

function Primes() {

};

Primes.prototype.isPrime = function(n) {
  // leastFactor(n)
  // returns the smallest prime that divides n
  //     NaN if n is NaN or Infinity
  //      0  if n=0
  //      1  if n=1, n=-1, or n is not an integer
  var leastFactor = function(n){

    if (isNaN(n) || !isFinite(n)) return NaN;
    if (n==0) return 0;
    if (n%1 || n*n<2) return 1;
    if (n%2==0) return 2;
    if (n%3==0) return 3;
    if (n%5==0) return 5;

    var m = Math.sqrt(n);
    for (var i = 7; i <= m; i += 30) {
      if (n%i==0)      return i;
      if (n%(i+4)==0)  return i+4;
      if (n%(i+6)==0)  return i+6;
      if (n%(i+10)==0) return i+10;
      if (n%(i+12)==0) return i+12;
      if (n%(i+16)==0) return i+16;
      if (n%(i+22)==0) return i+22;
      if (n%(i+24)==0) return i+24;
    }

    return n;
  }

  if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;
  if (n == leastFactor(n)) return true;
  return false;

}
/**
 * get all primes from 0 to max
 *
 * @param  {number} max
 * @return {object}
 */

Primes.prototype.find = function(max) {

  var marked = [];
  var result = {
    sum: 0,
    primes: []
  };

  for (var i = 2; i <= max; ++i) {
    if (!marked[i]) {

      result.primes.push(i);
      result.sum += i;

      for (var j = i << 1; j <= max; j += i) {
        marked[j] = true;
      }
    }
  }

  return result;
}
