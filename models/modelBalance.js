const mongoose = require('mongoose')
 const categoria= mongoose.Schema({
    tipo:{
    type:String,
    require:true
    },
    name:{
        type:String,
        required:true,
        minLength:[4,'Name should be minimum of 4 characters']
    },
    sumaTotal:{
        type:Number,
        default:0
    }
 })
 const balanceDetalles=mongoose.Schema({
    idreferencia:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    sumaDetalles:{
        type:Number,
        require:true,
        default:0
    }
 })

 const modelcatBalance =mongoose.model("catBalance2.0neverstore",categoria);
 const  modeldetallesBalance = mongoose.model("detallesBalance2.0neverstore",balanceDetalles);

 module.exports={
    modelcatBalance,modeldetallesBalance
 }