const http = require('http')
const url = require('url')
const fs = require('fs');
const { dirname } = require('path');


const server = http.createServer((req , res) => {
    console.log(req.url);

    const pathName = req.url ; 

    if (pathName === '/overview'){
        res.end("This is Overview from Server")
    }
    else if(pathName === "/product"){
        res.end("This is Product From Server")
    }
    else if (pathName === '/api')
    {
        console.log("Dir Path : " + __dirname);
        fs.readFile(`${__dirname}/data.json` , 'utf-8' , (err , data) => {
            const productData = JSON.parse(data) ;
            res.writeHead(
             200 , {   'content-type' : 'application/json'} 
            )
             console.log(productData);
             res.end(data)
            } )
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