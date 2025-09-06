const express=require('express');
const router=express.Router();
const userController=require('../controllers/userControllers');
const auth =require('../middelware/auth');
const authorize=require('../middelware/role');

router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);

router.post('/logout',auth,userController.logoutUser);
router.post('/logoutAll',auth,userController.logoutAllUsers);
router.get('/profile',auth,userController.getUserProfile);
router.patch('/update-me',auth,userController.updateProfile);

router.get('/users',auth,authorize("admin"),userController.getAllUsers);
router.get('/users/:id',auth,authorize("admin"),userController.getUserById);
router.delete('/users/:id',auth,authorize("admin"),userController.deleteUser);
router.delete('/users',auth,authorize("admin"),userController.deleteAllUsers);

module.exports=router;