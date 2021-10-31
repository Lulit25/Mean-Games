require("dotenv").config({"path":".env"});
const express = require("express");
const path = require("path");
const { ppid } = require("process");
require('./api/data/db.js');
const routes = require ('./api/routes');

const app = express();

const port = process.env.PORT || 6000;

app.set("port", port);
// app.use ("/api", function(req, res, next){
//     res.header("Access-Control-Allow-Origin","http://localhost:4200");
//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, content-Type, Accept, Accept-Language, User-Agent");

//     next()
//     })
// app.use ("/api", function(req, res, next){
//     res.header("Access-Control-Allow-Origin","http://localhost:4200");

//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");

//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Content-type, Accept, Accept-Language, User-Agent", "Authorization");

//     next()

//     })

        
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));

app.use("/api", routes);

const server = app.listen(app.get("port"), function(){
    console.log("listening on port:", server.address().port);
})