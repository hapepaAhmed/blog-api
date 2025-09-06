require('dotenv').config();
const mongoose=require('mongoose');

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to the database');
    }
    catch(error){
        console.log(`error aquired ${error}`);
        process.exit(1)
    };
};

module.exports=connectDb;