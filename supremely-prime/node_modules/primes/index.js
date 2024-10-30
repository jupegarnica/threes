'use strict';

var isprime = require('isprime');

/**
 *  Generate prime numbers according to the lower and upper bound
 *  @param {Number} min
 *  @param [{Number}] max
 */

module.exports = function(min, max) {
  var holdme;

  if (!arguments.length) return [];
  if (min < 0 || max < 0) return [];
 
  if (min === max) return isprime(min) ? [min] : [];

  if (~min && ~max && min > max) {
    holdme = min;
    min = max;
    max = holdme;
  };
  
  if (max === undefined) {
    max = min;
    min = 0;
  };

  if (min == 0) min = 1;

  return new Array(max+1)
    .join(',').split(',')
    .map(function(a, b){ return b; })
    .slice(min, max)
    .filter(isprime);
};

