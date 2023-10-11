const http = require('http')
const url = require('url')

const server = http.createServer((req , res) => {
    console.log(req.url);

    const pathName = req.url ; 

    if (pathName === '/overview'){
        res.end("This is Overview from Server")
    }
    else if(pathName === "/product"){
        res.end("This is Product From Server")
    }
    else 
    {
        res.writeHead(404 , {
            'content-type' : 'text/html', 
            'my-own-header' : 'Hello-Node'
        })
        res.end("<h1> Page Not Found !</h1>")
    }

})

const PORT = 5100
server.listen(PORT , ()=>{
    console.log(`Server started on Port Number : ${PORT}`);
})