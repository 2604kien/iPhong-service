const Request=require('../models/Request');
const getAllRequestInfo=async(req,res,next)=>{
    try{
        const foundedRequest=await Request.find();
        if(!foundedRequest?.length){
            return res.status(400).json({msg:"No Request Item is found"})
        }
        return res.status(200).json({message:"All Request data retrieved", data: foundedRequest});
    }
    catch(err){
       next(err);
    }
}
const getOneRequestInfo=async (req,res,next)=>{
    const {id}=req.params;
    try{
        const foundedRequest=await Request.findById(id).select("-__v");
        if(!foundedRequest){
            return res.status(400).json({msg:"No Request Data Found"})
        }
        return res.json({msg:"retrive Request successfully", data:foundedRequest});
    }
    catch(err){
        next(err)
    }
}
const createNewRequest=async(req,res,next)=>{
    const {title, description, email, phoneNumber, imageUrl, isPaid}=req.body;
    if(!title || !description || !email || !phoneNumber || !imageUrl || !isPaid){
        return res.status(400).json({message: "All field needed."})
    }
    const RequestObject={
        title,
        description,
        email,
        phoneNumber,
        imageUrl,
        isPaid
    }
    const result=await Request.create(RequestObject);
    if(result){
        return res.status(201).json({message:`Item ${title} is successfully added.`})
    }
    else{
        return res.status(400).json({message:'Invalid data recieved'});
    }
}
const deleteRequestById=async(req, res, next)=>{
    const {id}=req.params;
    try{
        if(!id) return res.status(400).json({message: "Id required"});
        const foundedRequest=await Request.findById(id);
        console.log(foundedRequest);
        const result=await Request.deleteOne(foundedRequest);
        res.json(result);
    }
    catch(err){
        console.log(err)
    }
}
const updateRequestData=async(req,res,next)=>{
    const {title, description, email, phoneNumber, imageUrl, isPaid}=req.body;
    const {id}=req.params;
    console.log({title, description, email, phoneNumber, imageUrl, isPaid});
    if(!title || !description || !email || !phoneNumber || !imageUrl || !isPaid){
        return res.status(400).json({message: "All field needed."})
    }
    try{
        if(!id) return res.status(400).json({message: "Missing data is required"});
        const foundedRequest=await Request.findById(id);
        if(!foundedRequest) return res.json({msg:"Request not found"});
        foundedRequest={
            ...foundedRequest,
            title,
            description,
            email,
            phoneNumber,
            imageUrl,
            isPaid
        }
        const result=await foundedRequest.save();
        res.json(result);
    }
    catch(err){
        next(err);
    }
}
module.exports={
    getAllRequestInfo,
    getOneRequestInfo,
    createNewRequest,
    updateRequestData,
    deleteRequestById
}