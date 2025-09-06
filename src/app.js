require('dotenv').config();
const express =require('express');
const connectDb=require('./config/db');
const errorHandler = require('./middelware/errorHandler');
const userRoutes=require('./routes/user');
const postRoutes=require('./routes/post');
const commentRoutes=require('./routes/comment');
const categoryRoutes=require('./routes/category');

const port=process.env.PORT || 3000;
const app=express();

app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/post',postRoutes);
app.use('/api/category',categoryRoutes);

app.use(errorHandler);

connectDb().then(()=>{app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
   });
});