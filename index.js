const express = require('express');
const server = express();
const shortid = require('shortid');
const { json } = require('express');

let users = [
    // {
    //     id: 12,
    //     name: "Jane Doe",
    //     bio: "Not Tarzan's Wife, another Jane"
    // }
];

server.use(express.json());

server.post('/api/users', (req, res) => {
    const usersInfo = req.body;
    // function validateBody(body) {
    //     return true;
    // }
    // if (validateBody(body)) {
        usersInfo.id = shortid.generate();
        users.push(usersInfo);
        res.status(201).json(usersInfo);
    // } else {
        // res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    // }
})

server.get('/api/users', (req, res) => {
    res.status(201).json(users);
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const specific = users.find(user => user.id === id);
    if (specific) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(specific);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const deleted = users.find(user => user.id === id);
    if (deleted) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(deleted);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    let index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        changes.id = id;
        users[index] = changes;
        res.status(200).json(users[index]);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
})