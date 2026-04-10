const express = require("express");

const app = express() ;

// allow JSON

app.use(express.json());

// test route
app.get("/", (req, res) =>  
{
    res.send("Backend is working");
});

// import routes
const deviceRoutes = require("./routes/deviceRoutes");


// start server

app.listen(3000, () => 
{
    console.log("Server running on port 3000");
});
    