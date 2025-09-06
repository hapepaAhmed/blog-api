const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middelware/auth');
const authorize = require('../middelware/role');


router.get('/categories', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategory);

router.post('/admin/categories', auth, authorize("admin"), categoryController.addCategory);
router.patch('/admin/categories/:id', auth, authorize("admin"), categoryController.updateCategory);
router.delete('/admin/categories/:id', auth, authorize("admin"), categoryController.deleteCategory);
router.delete('/admin/categories', auth, authorize("admin"), categoryController.deleteAllCategories);

module.exports = router;
