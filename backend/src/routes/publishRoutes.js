const express=require('express');
const router=express.Router();
const publishController=require('../controllers/publishController');
const verifyJWT=require('../middleware/verifyJWT');

router.route('/')
    .get(publishController.getAllPublishInfo)
    .post(verifyJWT,publishController.createNewPublish)
router.route('/:id')
    .get(publishController.getOnePublishInfo)
    .patch(verifyJWT,publishController.updatePublishData)
    .delete(verifyJWT,publishController.deletePublishById)
module.exports=router