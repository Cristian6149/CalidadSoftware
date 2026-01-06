const mongoose = require('mongoose')

const saldo= mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    saldo:{
        type:Number,
        require:true,
        default:0
    }
})

const prestamoCortoPlazo= mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    saldo:{
        type:Number,
        require:true,
        default:0
    }
})

const prestamoLargoPlazo= mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    saldo:{
        type:Number,
        require:true,
        default:0
    }
})

const CapitalSocial = mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    saldo:{
        type:Number,
        require:true,
        default:0
    }
})

const modelSaldo = mongoose.model("saldo2.0neverstore",saldo)
const modelPrestamoCortoPlazo=mongoose.model("prestamoCortoPlazo2.0neverstore",prestamoCortoPlazo)
const modelPRestamoLargoPlazo=mongoose.model("prestamolargoplazo2.0neverstore",prestamoLargoPlazo)
const modelCapitalSocial=mongoose.model("capitalsocial2.0neverstore",CapitalSocial)

module.exports={modelSaldo,modelPrestamoCortoPlazo,modelPRestamoLargoPlazo,modelCapitalSocial }