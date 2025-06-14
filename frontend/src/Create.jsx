import React, { useState } from 'react'
import axios from 'axios'

function Create() {
  const [ task, setTask] = useState()
  const handleAdd = () =>{
    axios.post(`${import.meta.env.VITE_API_URL}/add`, {task})
    .then(result =>{
      location.reload(),
      console.log(result)
    } )
    .catch(err => console.log(err))
  }
  return (
    <div className='form'>
        
        <input class='input' type="text" name="" id="" placeholder='Enter a Task' 
        onChange={(e) => setTask(e.target.value)}/>
        <button class="button-54" role="button" type='button' onClick={handleAdd}>Add New Task</button>
        
    </div>
  )
}

export default Create