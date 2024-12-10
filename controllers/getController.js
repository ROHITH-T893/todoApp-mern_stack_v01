const express=require('express')
const router=express.Router()
const todom=require('../models/todoM.js')
const { default: mongoose } = require('mongoose')
router.route('/get').get(async(req,res,next)=>{
    const data = await todom.find()
    
    res.status(202).json({data})
}).put(
    async(req,res,next)=>{
        res.status(200).json({msg:"true"})
        const fetchdata=await todom.find()
        const item=fetchdata.filter((item)=>item._id.equals(req.body._id))
        const item2=fetchdata.find((item)=>item._id.equals(req.body._id))
        console.log(item2);
        
        if (!item) {
    return res.status(404).json({ message: 'Todo not found' });
     }

        console.log(req.body);
        
        const up=await todom.updateMany({title:item2.title},{$set:req.body})
        console.log(up);
        
    }
).post(async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
        const result = await todom.collection.insertOne({ title, description });
        res.status(201).json({ message: 'Todo added successfully', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: 'Error adding todo', error: err.message });
    }
});
router.route('/get/:id').delete(async(req,res,next)=>{

    const {id}=req.params
    if (!id) {
        return res.status(400).json({ message: '_id is required' });
    }
    console.log(id);
    
    const dele= await todom.findByIdAndDelete(id)
    res.status(200).json({
        msg:"success"
    })
})

module.exports=router