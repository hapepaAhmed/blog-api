const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
   title:{
    type:String,
    required:true,
    trim:true,
   },
   content:{
     type:String,
     required:true,
     trim:true,
   },
   status:{
    type:String,
    enum:["draft","published"],
    default:"draft",
   },
   author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Category',
    },
    comment:[{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Comment',
        },
    ],
    tags: {
        type: [String], 
        default: [],    
    },

},{ timestamps:true,});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;