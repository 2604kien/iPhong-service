const User=require('../models/User');
const bcrypt=require('bcrypt');
const getAllUserInfo=async(req,res,next)=>{
    try{
        const foundedUser=await User.find();
        if(!foundedUser?.length){
            return res.status(400).json({msg:"No User Item is found"})
        }
        return res.status(200).json({message:"All User data retrieved", data: foundedUser});
    }
    catch(err){
       next(err);
    }
}
const getOneUserInfo=async (req,res,next)=>{
    const {id}=req.params;
    try{
        const foundedUser=await User.findById(id).select("-__v");
        if(!foundedUser){
            return res.status(400).json({msg:"No User Data Found"})
        }
        return res.json({msg:"retrive User successfully", data:foundedUser});
    }
    catch(err){
        next(err)
    }
}
const createNewUser=async(req,res,next)=>{
    const{username, password, fullName, roles}=req.body;
    if(!username||!password||!fullName){
        return res.json({msg:"All field required"});
    }
    const foundedUser=await User.findOne({username});
    if(foundedUser){
        return res.status(409).json({message:`User ${username} is already created.`});
    }
    const hashedPassword=await bcrypt.hash(password, 10);
    const UserObject={
        username,
        password:hashedPassword,
        fullName,
        roles:["user"]
    }
    const result=await User.create(UserObject);
    if(result){
        return res.status(201).json({message:`User ${username} is successfully added.`})
    }
    else{
        return res.status(400).json({message:'Invalid data recieved'});
    }
}
const deleteUserById=async(req, res, next)=>{
    const {id}=req.params;
    try{
        if(!id) return res.status(400).json({message: "Id required"});
        const foundedUser=await User.findById(id);
        console.log(foundedUser);
        const result=await User.deleteOne(foundedUser);
        res.json(result);
    }
    catch(err){
        console.log(err)
    }
}
const updateUserData=async(req,res,next)=>{
    const{password, fullName}=req.body;
    if(!username||!password||!fullName){
        return res.json({msg:"All field required"});
    }
    const hashedPassword=await bcrypt.hash(password, 10);
    const {id}=req.params;
    console.log({id, title, description});
    try{
        if(!id) return res.status(400).json({message: "Missing data is required"});
        const foundedUser=await User.findById(id);
        if(!foundedUser) return res.json({msg:"User not found"});
        foundedUser.password=hashedPassword;
        foundedUser.fullName=fullName;
        const result=await foundedUser.save();
        res.json(result);
    }
    catch(err){
        next(err);
        console.log(err)
    }
}
module.exports={
    getAllUserInfo,
    getOneUserInfo,
    createNewUser,
    updateUserData,
    deleteUserById
}