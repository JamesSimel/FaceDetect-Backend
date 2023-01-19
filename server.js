const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

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
                password:"banana",
                joined: new Date()
            }
        ] 
        
    }
app.get("/", (req, res)=>{
    res.send(database.users);
});

app.post("/signin", (req, res)=>{
    if (req.body.email === database.users[0].email &&
         req.body.password === database.users[0].password
         ) {
            res.json("Success!")
         } else {
            res.status(400).json("error signing in!");
         }
    
});

app.post("/register", (req, res)=>{
    const {name, email, password} = req.body;
    database.users.push(
        {
            id: "125",
            name: name,
            email:email,
            entries: 0,
            password:password,
            joined: new Date()
        }
    )
    res.json(database.users[database.users.length-1]);
})
app.listen(5000, ()=> {
console.log("app is running on port 5000");
})

app.post("/profile:id", (req, res) => {
    res.json("registered sucess")
});

app.put("/image", (req, res) => {
    res.json("Your rank is #10")
});
/*
-- HOW THE API WILL WORK
-- / Have a route that response with  res = this is working
---/signin --> POST = success/ fail
---/register --> POST =  - user
---/profile/:userid = GET = user
---/image --> PUT  --> user
--
*/