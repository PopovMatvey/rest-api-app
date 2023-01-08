/*Libs*/
const express = require('express'); // api requests lib
const path = require('path');       // for init static directory
const { v4 } = require('uuid');     // generate id
const app = express();              // app iniy
app.use(express.json());            // use json for requests

/*Varibles*/
const PORT_APP = 2000;              // app port
const urlRequest = '/api/contacts'; // url request api
let CONTACTS = [];                  // got array

/*Requests*/
//GET
app.get(`${urlRequest}`, (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS);

    }, 1000
    )
});

//POST "CREATE"
app.post(`${urlRequest}`, (req, res) => {
    const contact = { ...req.body, id: v4(), marked: false }
    CONTACTS.push(contact);
    res.status(201).json(contact);
});

//DELETE
app.delete(`${urlRequest}/:id`, (req, res) => {
    CONTACTS = CONTACTS.filter(c =>
        c.id != req.params.id
    );
    res.status(200).json({ message: "Контакт был удалён" });
});

//PUT
app.put(`${urlRequest}/:id`, (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id);
    CONTACTS[idx] = req.body;
    res.json(CONTACTS[idx]);
});

/*Directory*/
// init statics
app.use(express.static(path.resolve(__dirname, 'client')));

// lisening all get requests
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", 'index.html'))
});

// default massage
app.listen(PORT_APP, () => console.log(`Server has been started on port ${PORT_APP}`));

