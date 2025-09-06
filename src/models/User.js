require('dotenv').config();
const mongoose=require('mongoose');
const validator=require('validator');
const bcryptjs=require('bcryptjs'); 
const jwt=require('jsonwebtoken');

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true,
        validate(val){
            if(!validator.isEmail(val)){
               throw  new Error('emial is not valid')    
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        validate(val){
            const password=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            if(!password.test(val)){
                throw new Error('please enter valid password')
            }
        }
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    }, 
    profilePicture:{
      type:String,
      default:null,
    },
    bio:{
      type:String,
      trim:true,
      default:'',

    },
    tokens:[{
        type:String,
    }],
},{timestamps:true,});

userSchema.virtual('posts',{
    ref:'Post',
    localField:'_id',
    foreignField:'author',
});
userSchema.virtual('comments',{
    ref:'Comment',
    localField:'_id',
    foreignField:'author',
});



userSchema.statics.findByCredentials=async function(em,pass){
    const user =await this.findOne({email:em})
    if(!user){
        throw new Error('unable to login ')
    }
    const match=await bcryptjs.compare(pass,user.password)
    if(!match){
       throw new Error('unable to login')   
    }
    return user;
};



userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password')){
     user.password=await bcryptjs.hash(user.password,8)
    }
    next();
});
 


userSchema.methods.generateToken=async function(){
    const user =this 
    const token = jwt.sign({_id:user._id.toString()},process.env.SECRETKEY)
    user.tokens=user.tokens.concat(token)
    await user.save()
    return token;
}



userSchema.methods.toJSON=function(){
    const user =this
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};

const User=mongoose.model('User',userSchema);
module.exports=User;