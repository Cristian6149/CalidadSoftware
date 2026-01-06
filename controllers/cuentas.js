const {modelSaldo,modelPrestamoCortoPlazo,modelPRestamoLargoPlazo,modelCapitalSocial } = require('../models/modelCaja');

const setterCuenta= app =>{

    app.post('/registrocuenta/:id',async (req,res)=>{
        try{
             const updateCuenta = await modelSaldo.findByIdAndUpdate(req.params.id,{$set:req.body});
            return res.status(200).json(updateCuenta)

        }catch(e){
            console.log(e)
            return res.json({e})
        }
    })

    app.post('/registrocortoplazo/:id',async (req,res)=>{
        try{
            const updatePrestamoC =await modelPrestamoCortoPlazo.findByIdAndUpdate(req.params.id,{$set:req.body})
             return res.json({message:updatePrestamoC})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })

    app.post('/registrolargoplazo/:id',async (req,res)=>{
        try{
            const updatePrestamoL =await modelPRestamoLargoPlazo.findByIdAndUpdate(req.params.id,{saldo:req.body.saldo})
            //console.log(updatePrestamoL) 
            return res.send(updatePrestamoL)

        }catch(e){
            console.log(e)
            return res.send(e)
        }
    })

    app.post('/registrocapital/:id',async (req,res)=>{
        try{
            const newCapitalSocial =await modelCapitalSocial.findByIdAndUpdate(req.params.id,{$set:req.body})
             return res.json({message:newCapitalSocial})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })

    app.post('/registrocuenta',async (req,res)=>{
        try{
            const newCuenta = new modelSaldo(req.body)
             await newCuenta.save()
             return res.json({message:newCuenta})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })

    app.post('/registroprestamocortoplazo',async (req,res)=>{
        try{
            const newPrestamoC = new modelPrestamoCortoPlazo(req.body)
             await newPrestamoC.save()
             return res.json({message:newPrestamoC})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })

    app.post('/registroprestamolargoplazo',async (req,res)=>{
        try{
            const newPrestamoL = new modelPRestamoLargoPlazo(req.body)
             await newPrestamoL.save()
             return res.json({message:newPrestamoL})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })

    app.post('/registrocapitalsocial',async (req,res)=>{
        try{
            const newCapitalSocial = new modelCapitalSocial(req.body)
             await newCapitalSocial.save()
             return res.json({message:newCapitalSocial})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })
}

const gettersCuentas = app=>{
    //GET ALL
    app.get('/cuentas',async (req,res)=>{
        try{
            const getCuenta = await modelSaldo.find()
            res.status(200).json(getCuenta)
        }catch(e){
            res.status(500).json(e);
        }
    })

    app.get('/registroprestamocortoplazo',async (req,res)=>{
        try{
            const getCortoPlazo = await modelPrestamoCortoPlazo.find()
            res.status(200).json(getCortoPlazo)
        }catch(e){
            res.status(500).json(e);
        }
    })

    app.get('/registroprestamolargoplazo',async (req,res)=>{
        try{
            const getLargoPlazo = await modelPRestamoLargoPlazo.find()
            res.status(200).json(getLargoPlazo)
        }catch(e){
            res.status(500).json(e);
        }
    })

    app.get('/registrocapitalsocial',async (req,res)=>{
        try{
            const getCapitalSocial = await modelCapitalSocial.find()
            res.status(200).json(getCapitalSocial)
        }catch(e){
            res.status(500).json(e);
        }
    })
}

module.exports={setterCuenta,gettersCuentas}