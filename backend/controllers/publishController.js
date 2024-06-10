const Publish=require('../models/Publish');
const getAllPublishInfo=async(req,res,next)=>{
    try{
        const foundedPublish=await Publish.find();
        if(!foundedPublish?.length){
            return res.status(400).json({msg:"No Publish Item is found"})
        }
        return res.status(200).json({message:"All Publish data retrieved", data: foundedPublish});
    }
    catch(err){
       next(err);
    }
}
const getOnePublishInfo=async (req,res,next)=>{
    const {id}=req.params;
    try{
        const foundedPublish=await Publish.findById(id).select("-__v");
        if(!foundedPublish){
            return res.status(400).json({msg:"No Publish Data Found"})
        }
        return res.json({msg:"retrive Publish successfully", data:foundedPublish});
    }
    catch(err){
        next(err)
    }
}
const createNewPublish=async(req,res,next)=>{
    const{title, description, imageUrl}=req.body;
    if(!title||!description||!imageUrl){
        return res.json({msg:"All field required"});
    }
    const PublishObject={
        title:title,
        description:description,
        imageUrl: imageUrl,
    }
    const result=await Publish.create(PublishObject);
    if(result){
        return res.status(201).json({message:`Item ${title} is successfully added.`})
    }
    else{
        return res.status(400).json({message:'Invalid data recieved'});
    }
}
const deletePublishById=async(req, res, next)=>{
    const {id}=req.params;
    try{
        if(!id) return res.status(400).json({message: "Id required"});
        const foundedPublish=await Publish.findById(id);
        console.log(foundedPublish);
        const result=await Publish.deleteOne(foundedPublish);
        res.json(result);
    }
    catch(err){
        console.log(err)
    }
}
const updatePublishData=async(req,res,next)=>{
    const {title, description}=req.body;
    const {id}=req.params;
    console.log({id, title, description});
    try{
        if(!id) return res.status(400).json({message: "Missing data is required"});
        const foundedPublish=await Publish.findById(id);
        if(!foundedPublish) return res.json({msg:"Publish not found"});
        foundedPublish.title=title;
        foundedPublish.description=description;
        const result=await foundedPublish.save();
        res.json(result);
    }
    catch(err){
        next(err);
    }
}
module.exports={
    getAllPublishInfo,
    getOnePublishInfo,
    createNewPublish,
    updatePublishData,
    deletePublishById
}