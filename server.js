const express = require("express");
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser')

const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

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
    res.send(db.users);
});

app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post("/register", (req, res) => {register.handleRegister(res,req, db, bcrypt)})
app.get("/profile/:id", (req, res) => {profile.handleProfileGet(req, res, db)});
app.put("/image", (req, res) => {image.handleImage(req, res, db)});
app.post("/imageurl", (req, res) => {image.hanldeApiCall(req, res)});

app.listen(4000, ()=> {
    console.log("app is running on port 4000");
    })
    