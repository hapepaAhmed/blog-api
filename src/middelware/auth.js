const jwt =require('jsonwebtoken');
const {User} = require('../models');
const auth =async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        console.log(token);
        const decode=jwt.verify(token,process.env.SECRETKEY);
        console.log(decode);
        const user=await User.findOne({_id:decode._id,tokens:{ $in: [token] }})
        console.log(user);
        if(!user){
            throw new Error('user does not exist');
        }
        req.user=user;
        req.token=token;
        next()
    }
    catch(e){
        res.status(401).send({error:'please authenticate'})
    }
}
module.exports=auth