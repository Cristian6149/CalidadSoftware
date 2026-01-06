const { modelcatBalance,modeldetallesBalance }=require('../models/modelBalance.js')

const settersBalance = app=>{
   app.post('/agregarBalance',async (req,res)=>{
    try{
        const balance= new modelcatBalance(req.body);
        await balance.save()
        return res.json({message:balance})
    }catch(e){
        return res.send({erro:e})
    }
     
   })   

   app.post('/agregarSubBalance',async (req,res)=>{
    try{
        const balance= new modelsubcatBalance(req.body);
        await balance.save()
        return res.json({message:balance})
    }catch(e){
        return res.send({erro:e})
    }
     
   }) 

   app.post('/agregarDetalleSubBalance',async (req,res)=>{
    try{
        const balance= new modelsubcatdetalle(req.body);
        await balance.save()
        return res.json({message:balance})
    }catch(e){
        return res.send({erro:e})
    }
     
   }) 

   app.post('/agregarDetalleSubCatBalance',async (req,res)=>{
    try{
        const balance= new modeldetallesBalance(req.body);
        await balance.save()
        return res.json({message:balance})
    }catch(e){
        return res.send({erro:e})
    }
     
   }) 
}

module.exports={
    settersBalance
}