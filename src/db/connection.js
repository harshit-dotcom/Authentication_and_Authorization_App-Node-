const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/registrations").then( () => {
    console.log("Database Connection Establised");
}).catch( (e) => {
    console.log("Database Connection Failure", e);
} )
