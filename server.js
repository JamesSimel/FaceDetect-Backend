// import express  from "express";  
const express = require("express");
// import bcrypt from 'bcrypt-nodejs'; 
const bcrypt = require('bcrypt-nodejs');
// import bodyParser from "body-parser";
const bodyParser = require('body-parser')
// import cors from 'cors';
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'mrrobot',
        password : 'jkSn#6162',
        database : 'smart-brain'
    }
});


var hash = bcrypt.hashSync("bacon"); 


const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = 
    {
        users: [
            {
                id: "123",
                name: "John",
                email:"john@gmail.com",
                entries: 0,
                password:"cookies",
                joined: new Date()
            },
            {
                id: "124",
                name: "Sally",
                email:"sally@gmail.com",
                entries: 0,
                password:"bananas",
                joined: new Date()
            }
        ] 
        
    }

app.get("/", (req, res)=>{
    res.send(database.users);
});

app.post("/signin", (req, res)=>{
    bcrypt.compare("465@g647", '$2a$10$vEalas.sdZ1SBNGefSIv5.RKOyZni41eMTaqITmLJlo4z.ecqXWem', function(err, res) {
        // res == true
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", '$2a$10$vEalas.sdZ1SBNGefSIv5.RKOyZni41eMTaqITmLJlo4z.ecqXWem', function(err, res) {
        // res = false
        console.log('second guess', res);
    });
    
    
    if (req.body.email === database.users[0].email &&
         req.body.password === database.users[0].password
         ) {
            res.json(database.users[0])
         } else {
            res.status(400).json("error signing in!");
         }
    
});

app.post("/register", (req, res)=>{
    const {name, email, password} = req.body;
    db('users')
    .returning('*')
    .insert(
        {
            email: email,
            name: name,
            joined: new Date(),
        }
        ).then(user => {
            res.json(user[0])
        })
        .catch(err => {
            res.status(400).json('Unable to register');
        })
})

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }  
   })
   if (!found) {
    res.status(404).json("No such user")
}
});

app.put("/image", (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user =>{
        if (user.id === id ){
            found = true;
            user.entries++;
           return res.json(user.entries);
        }
    })
    if (!found){
        res.status(400).json("No such user!")
    }
});


// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
// });

// Load hash from your password DB.
// bcrypt.compare("465@g647", $2a$10$vEalas.sdZ1SBNGefSIv5.RKOyZni41eMTaqITmLJlo4z.ecqXWem, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(4000, ()=> {
    console.log("app is running on port 4000");
    })
    