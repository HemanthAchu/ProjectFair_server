require('dotenv').config()
const express = require('express')
const cors =require('cors')
const router =require('./Routes/router')
require('./DB/connection')
const pfServer =express()
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))
const PROT =3000 || process.env.PROT

pfServer.listen(PROT,()=>{
    console.log(`PROJECT Fair Server Started at PORT:${PROT}`);
})
pfServer.get("/",(req,res)=>{
    res.status(200).send(`<h1 style="color:red" >PROJECT Fair Server Started </h1>`)

})
  