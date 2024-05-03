const projects =require('../Model/ProjectModel')
//addProject
exports.addProject = async (req,res)=>{
    // console.log("Inside Add project request");
    // console.log(req.payload);
    // console.log("sdfr");
    // console.log(req.body);
    // console.log('dcfghdx');
    // console.log(req.file);
    const {title,language,overview,github,website}=req.body
    const userId=req.payload
    const projectImage =req.file.filename

    try{
        const exisitingProject = await projects.findOne({github})
        if(exisitingProject){
            res.status(406).json("project already available in our system, kindly upload another !!!")
        }else{
            const newproject =new projects({
                title,language,overview,github,website,projectImage,userId
            })
            await newproject.save()
            res.status(200).json(newproject)
        }

    }catch(err){
    res.status(401).json(err)
    }
   
}

exports.getAllProjects = async (req,res)=>{
    const searchkey=req.query.search
    const query = {
        language : {
            $regex : searchkey,$options :"i"
        }
    }
try{
    const allprojects =await projects.find(query)
    res.status(200).json(allprojects)

}catch(err){
    res.status(401).json(err)
}
}
exports.getUserProjects =async (req,res)=>{
    const userId=req.payload
    try{
     const userProjects =await projects.find({userId})
     res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}
exports.getHomeProjects = async (req,res)=>{
    try{
    const homeProjects =await projects.find().limit(3)
    res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}
exports.editproject =async(req,res)=>{
    console.log("inside edit project");
    const {pid}=req.params
console.log(pid);
    const userId =req.payload
    const{title,language,overview,github,website,projectImage}=req.body
    const uploadimage =req.file?req.file.filename:projectImage
    console.log(uploadimage);
    try{
     const  updateproject =await projects.findByIdAndUpdate({_id:pid},{
        title,language,overview,github,website,projectImage:uploadimage,userId
     },{new:true})
     await updateproject.save()
     res.status(200).json(updateproject)
    }catch(err){
     res.status(401).json(err)
    }
}
exports.removeProjects=async(req,res)=>{
    const {id}=req.params
    try{
     const projectDetails =await projects.findByIdAndDelete({_id:id})
     res.status(200).json(projectDetails)
    }catch(err){
   res.status(401).json(err)
    }
}