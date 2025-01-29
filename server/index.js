const http = require("http");

const myServer = http.createServer((req,res)=>{
    console.log("Hello From Server");
    res.end("Req Received");
})

myServer.listen(8000,()=>console.log("Server Started"));