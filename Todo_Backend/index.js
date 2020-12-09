const express = require("express");
const app = express()
const cors = require('cors')
const port = 9000
app.use(cors());
app.use(express.json())
const Todos = []
app.get("/v1/Todos", (req, res) => res.send(Todos))
app.post("/v1/Todos/Add", (req, res) => {
    Todos.push(req.body)
    res.send(Todos);
})
app.put("/v1/Todos/Edit/:id", (req, res) => {
    const id = req.params.id
    const findItem = Todos.findIndex(v => {
        return v.id == id;
    })
    Todos[findItem] = req.body;
    res.send(Todos)
})
app.delete("/v1/Todos/Done/:id", (req, res) => {
    const iD = req.params.id;
    const findItem = Todos.findIndex(v => {
        return v.id == iD;
    })
    Todos.splice(findItem, 1);
    res.send(Todos)
})
app.listen(port, () => console.log("server running"))
