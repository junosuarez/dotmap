var assert = require('assert')

var dot = require('../index')

var d1 = {a: 1}
var d2 = {a: {b: 2}}
var d3 = {a: {b: {c: 3}}}
var d4 = {a: {b: {c: {d: 4}}}}
var d5 = {a: {b: {c: {d: {e: 5}}}}}

assert.equal(dot()(true), true)
assert.equal(dot('')(true), true)

assert.equal(dot('a')(d1), 1)
assert.equal(dot('a.b')(d2), 2)
assert.equal(dot('a.b.c')(d3), 3)
assert.equal(dot('a.b.c.d')(d4), 4)
assert.equal(dot('a.b.c.d.e')(d5), 5)

// dot.safe returns undefined instead of a ReferenceError
assert.ok(dot.safe('a.b.c')(d1) === undefined)

// dot.get makes an immediately invokes a getter
assert.equal(dot.get(d3, 'a.b.c'), 3)

// since it's something of a convenience anyway, dot.get is always safe
assert.equal(dot.get(d2, 'a.b.c'), undefined)

console.log('tests ok')