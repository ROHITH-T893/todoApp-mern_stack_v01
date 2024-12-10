const express=require('express')
const dotenv=require('dotenv')
const path=require('path')
const app=express()
const cors=require('cors')
const bodyParser = require('body-parser')//something unknown
const db = require('./config/connnectdb')
app.use(express.json())
app.use(cors())
dotenv.config({path:path.join(__dirname,"config",".env")})
//to connect mongodb
const condb=async()=>{
    await db();
}
condb()

app.use('/api/todo/',require('./controllers/getController'))


app.listen(process.env.PORT,(err)=>{
    if(err) throw err;
    console.log('your server is running '+process.env.PORT+" in "+process.env.NODE_ENV);
    console.log(`http://localhost:${process.env.PORT}/api/todo/get`);
    
})

