const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/crossoff", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to DB"))
.catch(console.error)

const Task = require('./models/Task')


// Retrieve Tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find()

    res.json(tasks)
})


// Create Tasks
app.post('/task/new', (req, res) => {
    const task = new Task({
        text: req.body.text
    })

    task.save()
    res.json(task)
})


// Delete Tasks
app.delete('/task/delete/:id', async (req, res) => {
    const result = await Task.findByIdAndDelete(req.params.id)

    res.json(result)
})


// Cross Off Task
app.get('/task/complete/:id', async (req, res) => {
    const task = await Task.findById(req.params.id)

    task.complete = !task.complete
    task.save()
    res.json(task)
})


app.listen(5000, () => console.log("Server has started on port 5000"))