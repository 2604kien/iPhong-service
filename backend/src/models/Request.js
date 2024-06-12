const mongoose=require('mongoose');
const requestSchema=new mongoose.Schema({
    title:{
     type: String,
     required: true
    },
    description:{
     type:String,
     required:true
    },
    email:{
     type:String,
     required:true,
    },
    phoneNumber:{
        type:String,
        required:true
    },
    imageUrl:{
       type:String,
       required:true
    },
    isPaid:{
       type:Boolean,
       require:false
    }
 })
 module.exports=mongoose.model('Request', requestSchema)