const jwt=require('jsonwebtoken');

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization||req.headers.Authorization
    const token=authHeader?authHeader.split(' ')[1]:"";
    jwt.verify(
        token,
        process.env.SECRET_TOKEN,
        (err, decoded)=>{
            if(err) {

                return res.status(403).json({message: "Forbidden"});
            }
            req.user=decoded.UserInfo.username;
            req.roles=decoded.UserInfo.roles;

            next(err);
        }
    )
}
module.exports=verifyJWT;