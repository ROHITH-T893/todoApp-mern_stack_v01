import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import './App.css'
const App = () => {
  const [data, setData] = useState([])
  const [isModel,setModel]=useState(false)
  const [istype,setType]=useState('POST')
  const [upData,setUp]=useState({
    _id:"",
    title:"",
    description:""
  })
  // console.log(upData._id);
  
  useEffect(()=>{
 getbook()
  },[])
  const getbook=async () => {
    try{
      const res= await axios.get("http://localhost:8080/api/todo/get")
      setData(res.data.data || [])
            
    }
    catch(err){
      if(err) throw err
    }
  }
  //post
const post=async(e)=>{
  e.preventDefault(); // Access form values
  if(istype=='POST'){
  const form = e.target;
  const title = form.title.value;
  const description = form.description.value;
  try{    
    const res=await axios.post('http://localhost:8080/api/todo/get',{title,description})
    console.log(res.msg);
    getbook()
    
  }
  catch(err){
    if(err) throw err
    console.log('error in post');
    
  }}
  else{
    try{
    const _id=upData._id;
    const title=upData.title;
    const description=upData.description;
    const res=await axios.put('http://localhost:8080/api/todo/get',{_id,title,description})
    console.log("updating is done");
    getbook()
    }
    catch(err){
      if(err) throw err
      console.log("error occurs in updating");
      
    }
  }
  setModel(false)
}
const Hdelete=async(_id)=>{
  try{
  const res=await axios.delete(`http://localhost:8080/api/todo/get/${_id}`)
  console.log("deleting id done "+_id);
  getbook()
  }
  catch(err){
    if(err) throw err
    console.log('error in delete');
  }
}

const handleEdit=(_id)=>{
  setType('UPDATE')
  const finded=data.find((elem)=>elem._id===_id)
  setUp({
    _id:finded._id,
    title:finded.title,
    description:finded.description
  })
  setModel(true)
}
const handleAdd=()=>{
  setType('POST')
  setUp({
    _id:"",
    title:"",
    description:""
  })
  setModel(true)
}
  
  return (
    
      <div className='con'>
        <div className="Model">
          {isModel &&
          <div className="Model-content">
            {istype=='POST' ?<h1>Add book</h1>:<h1>Edit book</h1>}
            <form id='form' onSubmit={post}>
              <label htmlFor="title">Title :
              <input type="text" 
              name='title'
              id='title'
              value={upData.title}
              onChange={(e)=>setUp({...upData,title:e.target.value})}
              /></label>
              <label htmlFor="description">Description :
              <input type="text"
              onChange={(e)=>setUp({...upData,description:e.target.value})} 
              name='description'
              value={upData.description}/></label>
              <button type="submit" >submit</button>
              <button type="button" onClick={() => setModel(false)}>Cancel</button>
              <p>Copyright © 2024 boltnrots, Inc.</p>
            </form>
          </div>}
        </div>
        <div className='title-hold'>
        <h1>Todo List</h1>
        <button onClick={()=>handleAdd()}>Add</button>
        </div>
        <div className="todos">
        {Array.isArray(data) ? (
          data.map((elem, index) => <div className='todo-con' key={index}>
            
            <div><h1>{elem.title}</h1>
            <p>{elem.description}</p></div>
            <div className='btn-con'>
            <button id='edit' onClick={()=>handleEdit(elem._id)}>Edit</button>
            <button id='delete' onClick={()=>Hdelete(elem._id)}>Delete</button>
            </div>
            </div>)
        ) : (
          <p>Data is not in an array format or not available.</p>
        )}
        </div>

        <div className="footer">
          <p><span>by Rohith </span> Copyright © 2024 boltnrots, Inc</p>
        </div>
      </div>
    
    
  )
}

export default App