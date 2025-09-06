const express=require('express');
const router=express.Router();
const auth=require('../middelware/auth');
const authorize=require('../middelware/role');
const postController=require('../controllers/postController');


router.get('/posts',postController.getPosts);
router.get('/posts/:id',postController.getPost);

router.post('/posts',auth,postController.addPost);
router.patch('/posts/:id',auth,postController.updatePost);
router.delete('/posts/:id',auth,postController.deletePost);
router.delete('/posts',auth,postController.deleteAll);

router.get('/admin/posts',auth,authorize("admin"),postController.getAllPosts);
router.get('/admin/posts/:id',auth,authorize("admin"),postController.getPostById);
router.delete('/admin/posts/:id',auth,authorize("admin"),postController.deletePostById);
router.delete('/admin/posts',auth,authorize("admin"),postController.deleteAllPosts);


module.exports=router;