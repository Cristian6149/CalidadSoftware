const mongoose=require('mongoose')
 // Obtener la fecha actual
 const fechaActual = new Date();

 // Crear una nueva instancia de Date con la misma fecha, pero sin la hora
 const soloFecha = new Date(`${fechaActual.getUTCFullYear()}-${fechaActual.getUTCMonth()+1}-${fechaActual.getUTCDate()}`);
const usuarios=new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minLength:[4,'Name should be minimum of 4 characters']
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:[8,'Password should be minimum of 8 characters']
    },
    rol:{
        type:String,
        require:true,
        minLength:[4,'Rol should be minimum of 4 characters']
    }
})

const producto = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minLength:[2,'nombre muy corto']
    },
    precioBase:{
        type:Number,
        require:true,
    },
    precioVenta:{
        type:Number,
        require:true,
    },
    stock:{
        type:Number,
        require:true
    },
    codigo:{
        type:String
    }
})

const detalle = new mongoose.Schema({
    idVenta:{
       type:String,
       require:true
    },
    idProducto:{
        type:String,
        require:true
    },
    subtotal:{
        type:Number,
        require:true,
        min:0
    },
    subtotalGanancia:{
        type:Number,
        require:true,
        min:0
    },
    cantidad:{
        type:Number,
        require:true,
        min:0
    }

})

const venta = new mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        minLength:[2,'nombre muy corto']
    },
    apellido:{
        type:String
    },
    dni:{
        type:Number,
        require:true,
        minLength:[8,'dni muy corto']
    },
    fecha:{
      type:Date,
      default:soloFecha
    },
    total:{
        type:Number,
        min:0
    },
    totalganancia:{
        type:Number,
        min:0
    }
})
 
const modelUsuarios = mongoose.model('users2.0NeverStore',usuarios);
const modelDetalle = mongoose.model('detalle2.0NeverStore',detalle);
const modelVenta = mongoose.model('venta2.0NeverStore',venta);
const modelProducto = mongoose.model('producto2.0NeverStore',producto);

module.exports = {
    modelUsuarios,modelDetalle,modelVenta,modelProducto
};