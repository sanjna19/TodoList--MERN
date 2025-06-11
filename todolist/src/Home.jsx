import React, { useState } from 'react'
import Create from './Create'

function Home() {
  const [todos, setToDos] = useState([])
  return (
    <div>
        <h1> To-Do List</h1>
        <Create />
        {
          todos.length === 0
          ? 
          <div><h2>No record found</h2></div>
          :
          todos.map(todo => (
            <div>
              {todo}
              </div>
          ))
        }
    </div>
  )
}

export default Home