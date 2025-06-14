const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
require('dotenv').config();
// const { default: mongoose } = require('mongoose')

const app = express()
app.use(cors(
    {
        origin: ["https://todo-list-mern-frontend-teal.vercel.app"],
        methods: ["POST","GET"],
        credentials: true
    }
));
app.use(express.json())

mongoose.connect(process.env.DB_URI).then(() => console.log('Connected to MongoDB Atlas')).catch((err) => console.log('Connection error'));

app.get("/", (req, res) => {
    res.json("Hello")
})

app.get('/get', (req, res) =>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) =>{
    const {id} = req.params;
    console.log(id);
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
   })

app.delete('/delete/:id', (req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))

})

app.post('/add', (req, res) =>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))

})
app.listen(3001, ()=>{
    console.log("Server is running")
})
