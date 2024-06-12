const express=require('express');
const router=express.Router();
const requestController=require('../controllers/requestController');

router.route('/')
    .get(requestController.getAllRequestInfo)
    .post(requestController.createNewRequest)
router.route('/:id')
    .get(requestController.getOneRequestInfo)
    .patch(requestController.updateRequestData)
    .delete(requestController.deleteRequestById)
module.exports=router