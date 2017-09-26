/**
 * Consigna:
 * 1) Escribe un script que a partir de un array de ints devuelva un array de strings aplicando
 * las siguientes reglas:
 * - Devuelve Fizz si el número es divisible por 3 o si incluye un 3 en el número.
 * - Devuelve Buzz si el número es divisible por 5 o si incluye un 5 en el número.
 * - Devuelve FizzBuzz si el número es divisible por 3 y por 5.
 *
 * */

function fizzBuzz(array){
    return array.reduce(function (acc, number) {
        console.log(number);
        let word = sayFizz(number) + sayBuzz(number);
        return word ? acc.concat(word) : acc;
    }, []);
}


/**
 * Dice Fizz si tiene digito 3 o divisible por 3
 * */
function sayFizz(number) {
    return sayTheWord(number, 3, 'Fizz');
}

/**
 * Dice Buzz si tiene digito 5 o divisible por 5
 * */
function sayBuzz(number){
    return sayTheWord(number, 5, 'Buzz');
}

/**
 * Devuelve la palabra que queramos
 * Si cumple los criterios de ser divisible
 * o de contener el digito.
 **/
function sayTheWord(number, fizzBuzzNumber,word) {
    return (
        hasDigit(number,fizzBuzzNumber) ||
        isDivisible(number, fizzBuzzNumber)
    ) ? word : '';
}

/**
 * Se verifica si el numero es divisible por un numero en particular.
 * */
function isDivisible(number, divisor) {
    return (number % divisor) === 0;
}

/**
 * Verifica si esta el digito buscado en el numero
 * el number se pasa a string con el + '' asi se
 * puede utilizar el indexof.
 * */
function hasDigit(number, digit){
    return (number + '').indexOf(digit) >= 0;
}

module.exports = {
    fizzBuzz,
    isDivisible,
    hasDigit,
    sayBuzz,
    sayFizz
};


