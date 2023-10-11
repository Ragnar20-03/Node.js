const { log } = require('console');
const fs = require('fs')

try
{
    fs.readFile("./asyncDemo.txt" , 'utf-8' ,  (err , data) => {
        fs.writeFile("./NonBlockingWrite.txt" , data , ()=>{
            console.log("Data Write Succesfully");
        })
    })
}
catch(e )
{
    console.log("Inside Catch");
    console.log(e);
}
//  First we output this bcause read file Operation will perform asynchronously and further instruction gets executed

console.log("will Read FIle ");