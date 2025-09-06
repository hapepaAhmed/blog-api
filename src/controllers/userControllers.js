const {User}=require('../models/index');
const registerUser=async(req,res,next)=>{
    try{
      const {userName,email,password} =req.body
      const user=new User({userName,email,password});
      await user.save();
      const token= await user.generateToken();
      res.status(201).json({user,token});
    }
    catch(err){
        next(err)
    }
};

const loginUser=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user= await User.findByCredentials(email,password)
        const token= await user.generateToken();
        res.status(200).json({user,token});
    }
    catch(err){
        next(err)
    }
};

const logoutUser =async(req,res,next)=>{
   try{
        req.user.tokens=req.user.tokens.filter((el)=>{
            return el !==req.token
        });
        await req.user.save();
        res.status(200).json({message:'logged out successfully'})
   }
   catch(err){
    next(err)
   }
};

const logoutAllUsers=async(req,res,next)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.status(200).json({message:"Logged out from all sessions successfully"})
    }
    catch(err){
        next(err)
    }
};

const getUserProfile=async(req,res,next)=>{
    try{
        const user = req.user
        res.status(200).json({user})
    }
    catch(err){
        next(err)
    }
};

const updateProfile = async (req, res, next) => {
    try {
      const allowedUpdates = ["userName", "email", "password"]; // whitelist
      const updates = Object.keys(req.body);
  
      const isValid = updates.every((field) => allowedUpdates.includes(field));
      if (!isValid) {
        return res.status(400).json({ error: "Invalid updates" });
      }
      const user = req.user; 
      updates.forEach((field) => {
        user[field] = req.body[field];
      });
  
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
};


const getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      next(err);
    }
};

const deleteAllUsers=async(req,res,next)=>{
    try{
        const users=await User.deleteMany({});
        if(users.deletedCount ===0){
            res.status(404).json({message:'ther is no users'})
        } 
        res.status(200).json({message: `${users.deletedCount}users deleted`});
    }
    catch(err){
           next(err)
     }
};

module.exports={
    deleteAllUsers,
    deleteUser,
    getAllUsers,
    getUserById,
    updateProfile,
    getUserProfile,
    loginUser,
    logoutAllUsers,
    logoutUser,
    registerUser,
};
