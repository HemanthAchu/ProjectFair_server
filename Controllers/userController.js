
const users =require('../Model/UserModel')
const jwt =require('jsonwebtoken')
//register

exports.register = async (req,res)=>{

    console.log("inside Register function");
    const {username,email,password}=req.body
    console.log(username,email,password);

try{
//check email present in db or not
const existingUser = await users.findOne({email})
//if email is present then exit user
if(existingUser){
res.status(406).json("user Already exist!!!")
}else{
//else store/ insert ata to db
const newUser =new users({
    username,email,password,github:"",linkedin:"",profile:""
})
//to store data to mongodb from mongoose model
await newUser.save()
res.status(200).json(newUser)
}
}catch(err){
    res.status(401).json(err)
}
}

exports.login =async (req,res)=>{
console.log('inside a login');

const {email,password}=req.body
console.log(email,password);
try{
   const existingUser = await users.findOne({email,password})
 if(existingUser){
    const token =jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
    console.log(`backend  ${token}`);
   res.status(200).json({existingUser,token})
}else{
    res.status(404).json("incorrect Email/password")   
}
}catch(err){
console.log(err);
res.status(401).json(err)
}
}

exports.editUser =async(req,res)=>{
    const userId =req.payload
    const {username,email,password,github,linkedin,profileImage}=req.body
const profile =req.file?req.file.filename:profileImage
try{
  const updateUser =await users.findByIdAndUpdate({_id:userId},{
    username,email,password,github,linkedin,profile
  })
  await updateUser.save()
  res.status(200).json(updateUser)
}catch(err){
res.status(401).json(err)
}
}