const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


//create Login endpoint
const login=async (req,res)=>{
    const {username, password}=req.body;
    if(!username||!password){
        return res.status(400).json({message:"All field are required"});
    }
    const foundedUser=await User.findOne({username}).exec();
    if(!foundedUser){
        return res.status(401).json({message:"Unauthorized"})
    }
    const passwordMatch= await bcrypt.compare(password, foundedUser.password);

    if(!passwordMatch){
        return res.status(401).json({message:'Unauthorized'})
    }
    const accessToken=jwt.sign({
        UserInfo:{
            username: foundedUser.username,
        }
    },
    process.env.SECRET_TOKEN, {expiresIn:"15m"});
    const refreshToken=jwt.sign({
        UserInfo:{
            username:foundedUser.username
        }
    }, process.env.SECRET_TOKEN, {expiresIn:"7d"})
    foundedUser.refreshToken=refreshToken;
    await foundedUser.save();
    res.cookie('jwt', refreshToken,{
        httpOnly:true,
        secure: true,
        sameSite: 'None',
        maxAge:7*24*60*60*1000
    })
    res.json(accessToken);
}
const refresh=async(req,res)=>{
    const cookies=req.cookies;
    if(!cookies.jwt && !req.user){
        return res.status(401).json({message:"Unauthorized"});
    }
    const refreshToken=cookies.jwt;
    if(req.user){
        const foundedUser=await User.findOne({username:req.user.username}).exec();
        const accessToken=jwt.sign({
            UserInfo:{
                username:foundedUser.username
            }
        }, process.env.SECRET_TOKEN,{expiresIn:"15m"});
        const refreshToken=jwt.sign({
            UserInfo:{
                username:foundedUser.username
            }
        }, process.env.SECRET_TOKEN,{expiresIn:"7d"});
        if(!foundedUser)return res.status(401).json({message:"Unauthorized"});
        foundedUser.refreshToken=refreshToken;
        await foundedUser.save();
        res.cookie('jwt', refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite: true,
            maxAge:7*60*24*60*1000
        })
        return res.json({accessToken});
    }
    else{
        jwt.verify(
            refreshToken,
            process.env.SECRET_TOKEN,
            async(err, decoded)=>{
                //return 403 if verification fail
                if(err)return res.status(403).json({message:"Forbidden"})
                const foundedUser=await User.findOne({refreshToken}).exec();
                if(!foundedUser)return res.status(401).json({message:"Unauthorized"});
                //generate new access Token
                const accessToken=jwt.sign({
                    UserInfo:{
                        username:foundedUser.username,
                    }
                }, process.env.SECRET_TOKEN, {expiresIn:"15m"});
                return res.json({accessToken});
            }
        )
    }
}
const logout=(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(204);
    }
    //clear jwt cookies
    res.clearCookie('jwt',{
        httpOnly:true,
        sameSite:'None',
        secure:true
    })
}
module.exports={
    login,
    refresh,
    logout
}