const mongoose = require('mongoose')

const propiedades = mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    descripcion:{
        type:String,
        default:"xxxxxx"
    },
    valor:{
        type:Number,
        require:true,
        default:0
    }
})

const equipo = mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    descripcion:{
        type:String,
        default:"xxxxxx",
        require:false
    },
    valor:{
        type:Number,
        require:true,
        default:0
    }
})
const modelPropiedad = mongoose.model("propiedades2.0neverstore",propiedades);
const modelequipo = mongoose.model("equipo2.0neverstore",equipo);
module.exports={modelPropiedad,modelequipo}