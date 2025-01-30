const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req,res)=>{
    if(req.url=='/favicon.ico') return res.end();

    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    const log = `${Date.now()}: Request Received at ${req.url}\n`

    //Always use non blocking requests
    fs.appendFile("log.txt", log,(err,data)=>{
        switch(myUrl.pathname){
            case '/about':
                const username = myUrl.query.username;
                res.end("Salam Alaykum I am"+username);
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