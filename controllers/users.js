const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const isAuthenticated = require('../middleware/auth');
const moment= require('moment')
dotenv.config({path:'../config/config.env'})
const { modelUsuarios,modelProducto,modelVenta,modelDetalle } = require('../models/modelUsers.js')
setters = app =>{
    app.post('/register', async(req,res)=>{
      try {
        const { name, email, password } = req.body;
        //Check emptyness of the incoming data
        if (!name || !email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }

        //Check if the user already exist or not
        const userExist = await modelUsuarios.findOne({ email: req.body.email });
        if (userExist) {
            return res.json({ message: 'User already exist with the given emailId' })
        }
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = new modelUsuarios(req.body);
        await user.save();
        
        return res.json({ success: true, message: 'User registered successfully', data: user })
    } catch (error) {
        return res.json({ "message ": error });
    }
           
    })

    app.post('/agregarProducto',async (req,res)=>{
        try{
              const { name,precioBase,precioVenta,stock } = req.body;
              if( !name,!precioBase,!precioVenta,!stock ){
                return res.json({"message": "por favor ingrese todos los campos"})
              }
              const productos = new modelProducto(req.body)
              await productos.save();
              
              return res.json({data:productos})
        }catch(e){
            return res.json({"message": e});
        }
    })

 
    app.post('/venta/cliente', async(req,res)=>{
          try{
               const newVenta = new modelVenta(req.body);
               await newVenta.save()
               console.log(newVenta);
               res.json({"data1":newVenta})
          }catch(e){
            console.log(e)
                res.json({errorrrrr:e})
          }
    })
      app.post('/venta/detalle',async(req,res)=>{
        try{
            const newDetalle = new modelDetalle(req.body)
            await newDetalle.save()

            return res.json({data:newDetalle})
        }catch(e){
            res.send(e);
        }
      })

}

const getters = app =>{
   app.post('/login',async(req,res)=>{
    try {
      const { email, password } = req.body;
      //Check emptyness of the incoming data
      if (!email || !password) {
          return res.json({ message: 'Please enter all the details' })
      }
      //Check if the user already exist or not
      const userExist = await modelUsuarios.findOne({ email: req.body.email });
      if (!userExist) {
          return res.json({ message: 'Wrong credentials' })
      }
      //Check password match
      const isPasswordMatched = await bcrypt.compare(password, userExist.password);
      if (!isPasswordMatched) {
          return res.json({ message: 'Wrong credentials pass' });
      }
      process.env.JWT_EXPIRE="1d"
      const token =  jwt.sign({ id: userExist._id }, process.env.SECRET_KEY);
      console.log(token)
      
      return res.cookie("token",token).json({ success: true, message: 'LoggedIn Successfully', token: token })
       } catch (error) {
         return res.json({ error: error });
       }
      })

      app.get('/productos', async (req, res) => {
        try {
            let findS=req.query['q'] ?req.query['q'] : ""
            console.log(findS)
            /*-------------------------- */
            
           const productos = await modelProducto.find(findS ? { name:{$regex: findS,$options:'i'} }:undefined).sort({codigo:-1})/*.limit(5)*/;
            console.log("pruebas",productos) 
            if (!productos) {
                return res.json({ message: 'No product found' })
            }
            return res.json({ productos: productos })
        } catch (error) {
            return res.json({ error: error });
        }
       })

       app.post('/delete',async (req,res)=>{
             let idEliminar=req.query['id'] 
            try {
               await modelProducto.findByIdAndDelete(idEliminar);
               console.log('Producto eliminado correctamente');
            } catch (error) {
               console.error('Error al eliminar el Producto:', error);
            }
       })

    app.post('/productos/:id', async (req, res) => {
        try {
            const updateProductos = await modelProducto.findByIdAndUpdate(req.params.id,{$set:req.body});
            return res.status(200).json(updateProductos)
        } catch (error) {
            return res.json({ error: error });
        }
    })

    //GET
    app.get('/detalle/:id',async (req,res)=>{
        try{
            const getDetalle = await modelDetalle.find({"idVenta":req.params.id})
            res.status(200).json(getDetalle)
        }catch(e){
            res.status(500).json(e);
        }
    })

    //GET ALL
    app.get('/venta',async (req,res)=>{
        let findS=req.query['q'] ?req.query['q'] : ""
        let findS2=req.query['q2'] ?req.query['q2'] : ""
            console.log(findS)
            console.log(findS2)
        try{
            const getVenta = await modelVenta.find(findS ? (findS2?{fecha:{$gte:findS,$lte:findS2}}:{fecha:{$eq:findS}}):undefined);
             console.log(getVenta)
            res.status(200).json(getVenta)
        }catch(e){
            res.status(500).json(e);
        }
    })
   }

module.exports={
  setters,getters
}