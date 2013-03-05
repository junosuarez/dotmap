# dotmap
easy dot-notation accessor functions

## installation

    $ npm install dotmap

## usage

Have you ever wanted to build some functions, say, for an `Array#map` iterator, to reach into an object? Now you can!

    var dot = require('dotmap')

    var people = [
      {name: {first: 'A', last: 'Turing'}, age: 23},
      {name: {first: 'B', last: 'Cool'}, age: 31},
      {name: {first: 'C', last: 'Coolidge'}, age: 104}
    ]

    var firsts = people.map(dot('name.first'))
    // => ['A', 'B', 'C']

Sometimes you'd rather get undefined then a ReferenceError. For that, we can use `dot.safe`

    var people = [
      {name: {first: 'A', last: 'Turing'}, age: 23},
      {name: {first: 'B', last: 'Cool'}, age: 31},
      {name: {first: 'C', last: 'Coolidge'}, age: 104},
      {name: {last: 'Roosevelt'}, age: 49}
    ]

    var firsts = people.map(dot.safe('name.first'))
    // => ['A', 'B', 'C', undefine]


And for convenience, you can call `dot.get` to create and use the accessor function at the same time:

    var data = {name: {first: 'C', last: 'Coolidge'}, age: 104}

    dot.get(data, 'name.first')
    // => 'C'

Note that due to the overhead of creating functions, it's best to avoid using `dot.get` in a tight loop.

## hasn't this been done?

Yes. You've written it. Also, I've used and enjoyed @rauchg's [dot-component](https://npmjs.org/package/dot-component). The advantage here is that it's special cased for accessing, and it's optimized for speed. We unroll some of the loops to avoid as much array manipulation as possible.


## running the tests

change to package root director

    $ npm test

## contributors

jden <jason@denizac.org>

## license

MIT. (c) 2013 Agile Diagnosis <hello@agilediagnosis.com>, see LICENSE.md