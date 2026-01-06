const {modelmovimiento} = require('../models/modelCaja');

const settersCaja=app=>{
    app.post('/caja',async (req,res)=>{
        try{
            const newmovimiento = new modelmovimiento(req.body)
             await newmovimiento.save()
             return res.json({message:newmovimiento})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })
}

const gettersCaja=app=>{
    app.get('/caja', async (req,res)=>{
        try{
            let findS=req.query['q'] ?req.query['q'] : ""
            let findS2=req.query['q2'] ?req.query['q2'] : ""
                /* console.log(findS)
                console.log(findS2) */
            /*findS ? { name:{$regex: findS,$options:'i'} }-------------------------- findS ? (findS2?{fecha:{$gte:findS,$lte:findS2}}:{fecha:{$eq:findS}}):undefined)*/
             let result=await modelmovimiento.find(findS?(findS2?{fecha:{$gte:findS,$lte:findS2}}:{fecha:{$eq:findS}}):undefined)
             res.send(result)
        }catch(e){
            console.log(e)
        } 
     })
}

module.exports={
    settersCaja,gettersCaja
}