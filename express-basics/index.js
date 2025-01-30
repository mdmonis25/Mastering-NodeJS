const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    return res.send("Salam Alaykum from Homepage");
})

app.get("/about",(req,res)=>{
    return res.send(`This is ${req.query.name} and he's ${req.query.age}`);
})

app.listen(7865,()=>console.log("Server Started"));