// import express  from "express";  
const express = require("express");
// import bcrypt from 'bcrypt-nodejs'; 
const bcrypt = require('bcrypt-nodejs');
// import bodyParser from "body-parser";
const bodyParser = require('body-parser')
// import cors from 'cors';
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');

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


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send(database.users);
});

app.post("/signin", (req, res)=>{    
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data =>{
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid){
                return db.select('*').from('users')
                .where('email', '=', req.body.email)
                .then(user => {
                    res.json(user[0]);
                })
                .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('Wrong credentials')
            }
    })
    .catch(err => res.status(400).json('Wrong credentials'))
        
});

app.post("/register", (req, res) => {register.handleRegister(res,req, db, bcrypt)})

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id}).then(user => {
        if (user.length){
            res.json(user[0]);
        } else {
            res.status(404).json("No such user")
        }
       
    })
    .catch(err => {
        res.status(400).json("Error getting user")
    })
});

app.put("/image", (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => {
        res.status(400).json('unable to get entries')
    })
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
    