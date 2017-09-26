const express = require('express');
const router = express.Router();
const Responses = require('./helpers/responses');

// Data Hardcodeada
let stockData = require('../data/stock');

router.get('/', function (req, res) {
    let response = Responses(res);
    response.ok(stockData);
});

router.get('/:id', function (req, res) {
    let response = Responses(res);
    let id = req.params.id;

    let item = stockData.find(s => s.id == id);

    if (item){
        response.ok(item)
    } else {
        response.validationError({ message: 'item not exist'});
    }
});

/**
 * Cuando se va dar de alta un nuevo elemento en el stock
 * hay que verificar que antes no exista y
 * de ser asi se suma/resta directamente al stock que ya esta.
 * {
 *       id: null,
 *       product : {
 *           id: 1,
 *           name: 'Detergente'
 *       },
 *       quantity: 2
 *   }
 *
 * */

router.post('/', function (req, res) {
    let data = req.body;
    let response = Responses(res);

    // Una validacion basica, para tener el objeto completo.
    if( data && data.product && data.product.id && data.quantity){
        let toUpdate = stockData.find(s => s.product.id == data.product.id);
        if (toUpdate){ // Ya existe en stock sumamos a lo que ya hay.
            toUpdate.quantity = toUpdate.quantity + data.quantity;
            response.created(toUpdate);
        } else { // No existe lo agregamos!
            // Esto lo resolveria la DB,  para mantener la consistencia
            // del Ejemplo.
            data.id = stockData.length + 1;
            stockData = stockData.concat(data);
            response.created(data);
        }
    } else {
        // Habria que indicar cuales parametros.
        response.validationError({ messsage: 'missing parameters'})
    }
});

/**
 * Solo modificamos la cantidad de items de un producto.
 * Data a enviar:
 *
 * {
 *   "id": 2,
 *   "product": {
 *       "id": 2,
 *       "name": "Papel Higienico"
 *   },
 *   "quantity": 123132
 * }
 *
 * */

router.put('/:id', function (req, res) {
    let response = Responses(res);
    let id = req.params.id;
    let data = req.body;

    let toUpdate = stockData.find(s => s.id == id);

    if (toUpdate && data && typeof data.quantity !== 'undefined'){
        toUpdate.quantity = data.quantity;
        response.updated();
    } else {
        response.validationError({ message: 'item not exist'});
    }
});

/**
 * Borramos directamente un registro del stock
 * Esto lo deberia hacer un admin o un usuario con algun tipo
 * de privilegio especial (?)
 * */
router.delete('/:id', function (req, res) {
    let response = Responses(res);
    let id = req.params.id;

    let toDelete = stockData.find(s => s.id == id);

    if (toDelete){
        stockData = stockData.filter( s => s.id != id);
        response.deleted()
    } else {
        response.validationError({ message: 'item not exist'});
    }
});


module.exports = router;