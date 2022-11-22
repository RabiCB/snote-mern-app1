const mongoose=require('mongoose')

const {Schema}=mongoose

const userschema=new Schema(
    {
      title:String,
      post:String,
      date:{type:Date,default:Date.now}
    
    }
)

module.exports=new mongoose.model('user',userschema)