const {modelPropiedad,modelequipo} = require('../models/modelInmueble.js')

const setterInmuebles = app=>{
    app.post('/propiedades/:id',async(req,res)=>{
        try{
            const modify =await modelPropiedad.findByIdAndUpdate(req.params.id,{$set:req.body})
            return res.send(modify)
        }catch(e){
            return res.send(e)
        }
        
    })

    app.post('/propiedades',async (req,res)=>{
        try{
            const newProdpiedaes = new modelPropiedad(req.body)
             await newProdpiedaes.save()
             return res.json({message:newProdpiedaes})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })

    
    app.post('/equipo',async (req,res)=>{
        try{
            const newEquipo = new modelequipo(req.body)
             await newEquipo.save()
             return res.json({message:newEquipo})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })

    app.post('/equipo/:id',async(req,res)=>{
        try{
            const modify = await modelequipo.findByIdAndUpdate(req.params.id,{$set:req.body})
            return res.send(modify)
        }catch(e){
            return res.send(e)
        }
    })
}

getterInmueble= app=>{
    app.get('/propiedades',async(req,res)=>{
        try{
            const data=await modelPropiedad.find();
            return res.send(data)
        }catch(e){
            return res.send(e)
        }
    })

    app.get('/equipo',async (req,res)=>{
        try{
            const data =await modelequipo.find()
            return res.send(data)
        }catch(e){
            return res.send(e)
        }
    })
}

module.exports={setterInmuebles,getterInmueble}