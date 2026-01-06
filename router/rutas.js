const express = require('express');
const route = express.Router();
const {setters,getters} = require('../controllers/users.js');
const { settersBalance }=require('../controllers/balance.js');
const { setterCuenta,gettersCuentas } = require('../controllers/cuentas.js');
const { setterInmuebles,getterInmueble } = require('../controllers/inmueble.js')
const {settersCaja,gettersCaja} = require('../controllers/caja.js')

setters(route)
getters(route)
settersBalance(route)
setterCuenta(route)
gettersCuentas(route)
setterInmuebles(route)
getterInmueble(route)
settersCaja(route)
gettersCaja(route)

module.exports= route;