const mongoose = require('mongoose')
 // Obtener la fecha actual
 const fechaActual = new Date();

 // Crear una nueva instancia de Date con la misma fecha, pero sin la hora
 const soloFecha = new Date(`${fechaActual.getUTCFullYear()}-${fechaActual.getUTCMonth()+1}-${fechaActual.getUTCDate()}`);
 const movimientos= mongoose.Schema({
    tipo:{
    type:String,
    require:true
    },
    name:{
      type:String,
      require:true
    },
    descripcion:{
        type:String,
        required:true,
        minLength:[2,'descripcion should be minimum of 4 characters']
    },
    fecha:{
        type:Date,
        default:soloFecha
    },
    monto:{
        type:Number,
        require:true
    }
 })

 const modelmovimiento = mongoose.model('movimientos2.0NeverStore',movimientos);

module.exports = {
    modelmovimiento
};