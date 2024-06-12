const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
router.route('/')
    .get(userController.getAllUserInfo)
    .post(userController.createNewUser)
router.route('/:id')
    .get(userController.getOneUserInfo)
    .patch(userController.updateUserData)
    .delete(userController.deleteUserById)
module.exports=router