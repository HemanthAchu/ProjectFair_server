const jwt =require('jsonwebtoken')

const jwtMiddleware =(req,res,next)=>{
console.log('inside jwt');
 const token = req.headers["authorization"].split(' ')[1]
 if(token){
    console.log(token);
    // const {title,language,overview,github,website}= req.body
    // console.log(title);
    try{
      const response =jwt.decode(token,process.env.JWT_SECRET)
      console.log("sdgdgs");
    console.log(response)
    console.log("sdfijfn");
    req.payload =response.userId
    next()
    }catch(err){
      res.status(401).json("Authorization failed ... please login !!!")
      console.log("Authorization failed ... please login !!!");
    }

 }else{
    res.status(406).json("please provide token")
 }
}

module.exports =jwtMiddleware
