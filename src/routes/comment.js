const express=require('express');
const router=express.Router();
const commentController=require('../controllers/commentController');
const auth =require('../middelware/auth');
const authorize=require('../middelware/role');


router.get('/comments',commentController.getMyComments);
router.get('/comments/:id',commentController.getComment);

router.post('/comments',auth,commentController.addComment);
router.patch('/comments/:id',auth,commentController.updateComment);
router.delete('/comments/:id',auth,commentController.deleteComment);
router.delete('/comments',auth,commentController.deleteAll);

router.get('/admin/comments',auth,authorize("admin"),commentController.getAllComments);
router.get('/admin/comments/:id',auth,authorize("admin"),commentController.getCommentById);
router.delete('/admin/comments/:id',auth,authorize("admin"),commentController.deleteCommentById);
router.delete('/admin/comments',auth,authorize("admin"),commentController.deleteAllComments);

module.exports=router
