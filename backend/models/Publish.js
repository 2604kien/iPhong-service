const mongoose=require('mongoose');
const publishSchema=new mongoose.Schema({
   title:{
    type: String,
    required: true
   },
   description:{
    type:String,
    required:true
   },
   imageUrl:{
      type:String,
      required:true
   },
   downloadLink:{
      type:String,
      require:false
   }
})
module.exports=mongoose.model('Publish', publishSchema)