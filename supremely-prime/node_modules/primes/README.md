## primes

Get a list of prime numbers less than or equal to the upper bound. You can supply two arguments to get a list of prime numbers greater than or equal to the lower bound and less than or equal to the upper bound.

```
$ npm install primes
```

## Usage

```
var primes = require('primes');

// get a list of prime numbers lte to 20
primes(20);
// => [2, 3, 5, 7, 11, 13, 17, 19];

// get a list of prime numbers gte to 80 and lte 100
primes(80, 100);
// => [83, 89, 97];

// primes will flip the arguments if you are careless
primes(100, 80);
// => [83, 89, 97];
```

## Tests

```
$ npm test
```

## License

(The MIT License)

Copyright (c) 2014 TJ Krusinski &lt;tj@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
