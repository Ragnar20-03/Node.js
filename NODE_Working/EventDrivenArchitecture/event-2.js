const http = require('http')

const server = http.createServer()

server.on('request' , (req, res)=>{
    console.log("Request Recieved !");
    res.end("Request Recieved !")
})

server.on('request' , (req, res)=>{
    res.end("Another Request !")
})

server.on('close' , ()=>{
    console.log("Server Closed");
})

server.listen(5100 , "127.0.0.1" , ()=>{
    console.log("Waiting for Request")
})