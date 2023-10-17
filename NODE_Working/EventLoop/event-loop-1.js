const fs = require('fs')


//  Event LOOP is basically for callbacks

//  This is Not in Order as they are not call back functions and Not in Event Loop
setTimeout(() => console.log("Timer 1 Finsihed") , 0)

//  This is Not in Order as they are not call back functions and Not in Event Loop
setImmediate(( ) => console.log("Immidiate 1 finished"))


// This will execute Always last as File I/O is a bit Complex Task
fs.readFile("./test-file.txt" , ()=>{
    console.log("File IO is Finished");
})


// This will execute 1st as Node js Execute Top Level Code First 
console.log("Hello  Form TopLevelCode");


