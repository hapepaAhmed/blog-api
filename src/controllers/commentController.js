const {Comment}=require('../models/index');

const addComment=async(req,res,next)=>{
  try{
        const comment= new Comment({...req.body,author:req.user._id})
        await comment.save()
        res.status(201).json({comment})
    } 
  catch(err){
    next(err)
 }
};

const getMyComments=async(req,res,next)=>{
    try{
        await req.user.populate('comments') 
        const comments=req.user.comments
        res.status(200).json({comments})
       } 
    catch(err){
        next(err)
     }
};

const getComment=async(req,res,next)=>{
    try{
        const _id= req.params.id
        const comment=await Comment.findOne({_id,author:req.user._id})
         if(!comment){
               res.status(404).json({message:"unable to find a comment "})    
            }
         res.status(200).send({comment})
      } 
    catch(err){
        next(err)
     }
};   


const deleteComment=async(req,res,next)=>{
    try{
        const _id=req.params.id
        const comment=await Comment.findOneAndDelete({_id,author:req.user._id})
        if(!comment){
          return res.status(404).json({message: "unable to find comment"})
        }
        res.status(200).json({comment})
      }
    catch(err){
        next(err)
     }  
};

const deleteAll=async(req,res,next)=>{
    try{
        const comments = await Comment.deleteMany({author:req.user._id});  
        if(comments.deletedCount ===0){
          return res.status(404).json({message:"there is no comments"})
        }
        res.status(200).json({message: `${comments.deletedCount} comments are deleted successfully`})
    }
    catch(err){
        next(err)
     }  
};

const updateComment=async(req,res,next)=>{
    try{
        const _id=req.params.id
        const comment=await Comment.findOneAndUpdate({_id,author:req.user._id},req.body,{
         new:true,
         runValidators:true
        });
        if(!comment){
          return res.status(404).json({message: 'no comment found'})
        }
        res.status(200).json({comment})
      }
    catch(err){
        next(err)
     }  
};




const getAllComments = async (req, res, next) => {
    try {
      const comments = await Comment.find({}).populate("author", "userName email role");
      res.status(200).json({comments});
    } catch (err) {
      next(err);
    }
  };
  

  const getCommentById = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id).populate("author", "userName email role");
      if (!comment) {
        return res.status(404).json({ message: "comment not found" });
      }
      res.status(200).json({comment});
    } catch (err) {
      next(err);
    }
  };
  

  const deleteCommentById = async (req, res, next) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: "comment not found" });
      }
      res.status(200).json({ message: "comment deleted successfully" });
    } catch (err) {
      next(err);
    }
  };

  const deleteAllComments = async (req, res, next) => {
    try {
      const result = await Comment.deleteMany({});
      res.status(200).json({ message: `${result.deletedCount} Comments deleted successfully` });
    } catch (err) {
      next(err);
    }
  };
  




module.exports={
    getAllComments,
    getCommentById,
    deleteAllComments,
    deleteCommentById,
    addComment,
    getMyComments,
    getComment,
    deleteAll,
    deleteComment,
    updateComment,
};