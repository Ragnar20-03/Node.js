const http = require('http')

const server = http.createServer((request , response ) => {
    console.log(request);
    response.end("Hello From Http Server")
})

server.listen(5100 , ()=>{
    console.log("Server started on Port Number : 5100");
})