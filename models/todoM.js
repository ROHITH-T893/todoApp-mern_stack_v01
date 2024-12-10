const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    title:{type:String,
        required:true
    },
    description:String,
    createdAt:Date
})
const modl=mongoose.model('todo',schema,"todos" )
module.exports=modl