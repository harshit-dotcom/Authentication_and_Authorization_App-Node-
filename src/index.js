//Imports
const express = require("express");
const app = express();
const path = require("path");
require("./db/connection");
const Register = require("./models/enroll");

//Variable Definitions
const port = process.env.PORT || 3000;

//Setting Up HBS Template Engine
app.set('views', path.join(__dirname, "../views"));
app.set("view engine", "hbs");

//Getting data in JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Routings
app.get("/", (req, res)=> {
    res.render("signin");
});

app.get("/signup", (req, res)=> {
    res.render("signup");
});

//Registration and Saving Data in Database
app.post("/status", async (req,res) => {
    try{
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const address = req.body.address;
        const state = req.body.state;
        const zipcode = req.body.zipcode;
        const RegisterUser = new Register({
            firstname, lastname, username, password, email, address, state, zipcode
        });
        await RegisterUser.save();
        if (res.status(201)) 
        {
            res.render("registrationsuccess");
        } 
    } catch(e) {
        if (res.status(400)) {
            res.render("registrationerror");
        }
    }
});

//Authentication and Authorization
app.post("/login", async (req,res)=> {
    try {
        const currentUserName = req.body.username;
        const currentUserPass = req.body.password;
        const userdetails = await Register.findOne({username:currentUserName, password:currentUserPass});
        if (Object.keys(userdetails).length === 0) {
            res.render("loginerror");
        } else res.render(userdetails);
    }
    catch(e) {
        res.render("loginerror");
    }
})

// Listening
app.listen(port, (e) => { 
    if (e) throw e;
    console.log(`Running.. at ${port}`);
});