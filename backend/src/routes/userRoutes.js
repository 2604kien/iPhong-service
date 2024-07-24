const express=require('express');
const router=express.Router();
const verifyJWT=require('../middleware/verifyJWT');
const userController=require('../controllers/userController');
router.route('/')
    .get(verifyJWT,userController.getAllUserInfo)
router.route('/register')
    .post(userController.createNewUser)
router.route('/:id')
    .get(verifyJWT,userController.getOneUserInfo)
    .patch(verifyJWT,userController.updateUserData)
    .delete(verifyJWT,userController.deleteUserById)
module.exports=router