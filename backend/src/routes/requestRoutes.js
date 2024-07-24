const express=require('express');
const router=express.Router();
const requestController=require('../controllers/requestController');
const verifyJWT=require('../middleware/verifyJWT');
router.route('/')
    .get(verifyJWT,requestController.getAllRequestInfo)
    .post(requestController.createNewRequest)
router.route('/:id')
    .get(verifyJWT,requestController.getOneRequestInfo)
    .patch(verifyJWT,requestController.updateRequestData)
    .delete(verifyJWT,requestController.deleteRequestById)
module.exports=router