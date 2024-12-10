const mongoose=require('mongoose')
const db=async()=>{
    await mongoose.connect(process.env.DB_URL).then((con)=>{
    console.log(`mongodb is connected on ${con.connection.host}`); 
}).catch((err)=>{
    if(err){
        console.log(err.stack);
        
    }
})
}

module.exports=db;