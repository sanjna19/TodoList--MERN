const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
require('dotenv').config();
// const { default: mongoose } = require('mongoose')

const app = express()

const corsOptions = {
  origin: "https://todo-list-mern-frontend-teal.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://todo-list-mern-frontend-teal.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
app.options('/',cors(corsOptions));
// app.use((req, res, next) => {
//   res.setheader("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers", 
//     "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

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

module.exports = app;

// app.listen(3001, ()=>{
//     console.log("Server is running")
// })


// app._router.stack.forEach(r => {
//   if (r.route && r.route.path) {
//     console.log('Route:', r.route.path);
//   }
// });