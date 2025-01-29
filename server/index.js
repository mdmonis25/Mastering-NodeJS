const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req,res)=>{
    const log = `${Date.now()}: Request Received at ${req.url}\n`

    //Always use non blocking requests
    fs.appendFile("log.txt", log,(err,data)=>{
        switch(req.url){
            case '/about':
                res.end("Salam Alaykum I am Monis.")
                break;
            case '/':
                res.end("HomePage"); 
                break;
            default:
                res.end("404 not found");    

        }
    })
    
    // console.log(req);
    // res.end("req cannot be passsed here");
})

myServer.listen(8000,()=>console.log("Server Started"));