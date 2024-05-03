const mongoose =require('mongoose')
mongoose.connect(process.env.CONNECTION_STRING).then(
    result=>{
        console.log("Mongo Atlas connected with Pfserver");
    }
).catch(err=>{
    console.log(err);
    console.log("Connection Failed !!!");
})