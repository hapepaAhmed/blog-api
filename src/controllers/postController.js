const {Post}=require('../models/index');

const addPost=async(req,res,next)=>{
  try{
        const post= new Post({...req.body,author:req.user._id})
        await post.save()
        res.status(201).json({post})
    } 
  catch(err){
    next(err)
 }
};

const getPosts=async(req,res,next)=>{
    try{
        await req.user.populate('posts') 
        const posts=req.user.posts
        res.status(200).json({posts})
       } 
    catch(err){
        next(err)
     }
};

const getPost=async(req,res,next)=>{
    try{
        const _id= req.params.id
        const post=await Post.findOne({_id,author:req.user._id})
         if(!post){
               res.status(404).json({message:"unable to find a post "})    
            }
         res.status(200).send({post})
      } 
    catch(err){
        next(err)
     }
};   


const deletePost=async(req,res,next)=>{
    try{
        const _id=req.params.id
        const post=await Post.findOneAndDelete({_id,author:req.user._id})
        if(!post){
          return res.status(404).json({message: "unable to find post"})
        }
        res.status(200).json({post})
      }
    catch(err){
        next(err)
     }  
};

const deleteAll=async(req,res,next)=>{
    try{
        const posts = await Post.deleteMany({author:req.user._id});  
        if(posts.deletedCount ===0){
          return res.status(404).json({message:"there is no posts"})
        }
        res.status(200).json({message: `${posts.deletedCount} posts are deleted successfully`})
    }
    catch(err){
        next(err)
     }  
};

const updatePost=async(req,res,next)=>{
    try{
        const _id=req.params.id
        const post=await Post.findOneAndUpdate({_id,author:req.user._id},req.body,{
         new:true,
         runValidators:true
        });
        if(!post){
          return res.status(404).json({message: 'no post found'})
        }
        res.status(200).json({post})
      }
    catch(err){
        next(err)
     }  
};




const getAllPosts = async (req, res, next) => {
    try {
      const posts = await Post.find({}).populate("author", "userName email role");
      res.status(200).json({posts});
    } catch (err) {
      next(err);
    }
  };
  

  const getPostById = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id).populate("author", "userName email role");
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({post});
    } catch (err) {
      next(err);
    }
  };
  

  const deletePostById = async (req, res, next) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      next(err);
    }
  };

  const deleteAllPosts = async (req, res, next) => {
    try {
      const result = await Post.deleteMany({});
      res.status(200).json({ message: `${result.deletedCount} posts deleted successfully` });
    } catch (err) {
      next(err);
    }
  };
  




module.exports={
    updatePost,
    deletePost,
    deleteAll,
    getPost,
    getPosts,
    addPost,

    
    deleteAllPosts,
    deletePostById,
    getPostById,
    getAllPosts,
};