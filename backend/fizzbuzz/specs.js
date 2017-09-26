/**
 * Un poco de TDD
 * */

const test = require('tape');
const { fizzBuzz, isDivisible, hasDigit, sayBuzz, sayFizz } = require('./fizzbuzz.js');

test('Basico de FizzBuzz', function (t) {
    let data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,502,301,352];
    let result = fizzBuzz(data);
    console.log(result);
    t.ok(result.length === 11);
    t.end();
});

test('Es divisible', function(t){
    t.ok(isDivisible(9,3));
    t.false(isDivisible(10,3));
    t.ok(isDivisible(10,5));
    t.false(isDivisible(11,5));
    t.end();
});

test('Tiene el digito', function (t) {
    t.ok(hasDigit(45632,3));
    t.false(hasDigit(46298124,3));
    t.ok(hasDigit(45632,5));
    t.false(hasDigit(46298124,3));
    t.end()
});

test('FizzBuzz', function (t) {
    t.ok(sayFizz(45632) === 'Fizz');
    t.ok(sayBuzz(45632) === 'Buzz');
    t.end();
});