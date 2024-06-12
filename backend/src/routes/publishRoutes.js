const express=require('express');
const router=express.Router();
const publishController=require('../controllers/publishController');

router.route('/')
    .get(publishController.getAllPublishInfo)
    .post(publishController.createNewPublish)
router.route('/:id')
    .get(publishController.getOnePublishInfo)
    .patch(publishController.updatePublishData)
    .delete(publishController.deletePublishById)
module.exports=router