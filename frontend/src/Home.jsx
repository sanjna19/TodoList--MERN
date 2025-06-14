import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';


function Home() {
  const [todos, setToDos] = useState([])
  useEffect(() => {
    axios.get('https://todo-list-mern-api-eight.vercel.app/get')
    .then(result => setToDos(result.data))
    .catch(err => console.log(err))
  }, [])

   const handleEdit = (id) => {
     axios.put('https://todo-list-mern-api-eight.vercel.app/update/'+id)
    .then(result => {
      location.reload()
      console.log(result)
   })
    .catch(err => console.log(err))
   }

   const handleDelete = (id) =>{
    axios.delete('https://todo-list-mern-api-eight.vercel.app/delete/'+id)
    .then(result => {
      location.reload()
      console.log(result)
    })
    .catch(err => console.log(err))
   }

   

  return (
    <div>
        <h1> To-Do List</h1>
        <Create />
        {
          todos.length === 0
          ? 
          <div><h2>No Record Found</h2></div>
          :
          todos.map(todo => (
            <div className='task-block'>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}> 
                {todo.done ? 
                <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
              : <BsCircleFill className='icon'/>
              }
                <p className={todo.done ? 'line_through': ""}>{todo.task}</p>
                </div>
                <div>
                  <span> <BsFillTrashFill className='icon' 
                  onClick={ () => handleDelete(todo._id)}/> </span>
                  </div>
              </div>
          ))
        }
    </div>
  )
}

export default Home