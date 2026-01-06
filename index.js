const express = require('express');
const dotenv = require('dotenv')
const route = require('./router/rutas.js');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
dotenv.config({path:'./config/config.env'})
require('./db/db.js')

const app = express();

app.get('/sidebar/:page',(req,res,next)=>{
    const page = req.params.page.split('?')[0].split('#')[0]
    if(page.split('.').pop()!=='html') return next()
    if(page!== 'index.html'){
      
       try{
        jwt.verify(req.query.token,process.env.SECRET_KEY)
        return res.sendFile(__dirname+'/public/sidebar/sidebar.html')
      }catch(e){
        return res.redirect('/index.html')
     }    
    }
    res.redirect('/index.html')
})
app.get('/sidebar',(req,res)=>{
    console.log('sidebar')
    if(!req.query.token){
      return res.redirect('/index.html')
    }
    
    try{
        jwt.verify(req.query.token,process.env.SECRET_KEY)
        res.sendFile(__dirname+'/public/sidebar/sidebar.html')
    }catch(e){
        res.redirect('/index.html')
    }
})
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

app.use('/api',route)

app.listen(process.env.PORT);