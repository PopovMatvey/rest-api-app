const express = require('express');
const path = require('path');
const { v4 } = require('uuid');
const app = express();

// App port
const PORT_APP = 2000;
// Got array
let CONTACTS = [];

app.use(express.json());

//GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS);

    }, 1000
    )
});

//POST "CREATE"
app.post('/api/contacts', (req, res) => {
    const contact = { ...req.body, id: v4(), marked: false }
    CONTACTS.push(contact);
    res.status(201).json(contact);
})

//DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c =>
        c.id != req.params.id
    );
    res.status(200).json({ message: "Контакт был удалён" });
})

//PUT
app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id);
    CONTACTS[idx] = req.body;
    res.json(CONTACTS[idx]);
})

// init statics
app.use(express.static(path.resolve(__dirname, 'client')));

// lisening all get requests
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", 'index.html'))
});

// default massage
app.listen(PORT_APP, () => console.log(`Server has been started on port ${PORT_APP}`));

