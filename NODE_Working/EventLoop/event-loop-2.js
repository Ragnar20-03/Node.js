const { log } = require('console');
const fs = require('fs')

// Readme ->  In event-loop-1 Our Progeam gets terminate as there is no event loop as no call back functions and hence it terminate directly

// But in this case we have call back inside FileRead() Operation and it will enterd in event loop and always check weather it is pending for   Call back functions , if it is then it will wait and if not it will termnate

setTimeout(() => console.log("Timer 1 Finsihed") , 0)

setImmediate(( ) => console.log("Immidiate 1 finished"))


fs.readFile("./test-file.txt" , ()=>{
    console.log("File IO is Finished");
    console.log("-----------");

    setTimeout(() => console.log("Timer 2 Finsihed") , 0)
    setTimeout(() => console.log("Timer 3 Finsihed") , 3000)

    setImmediate(( ) => console.log("Immidiate 2 finished"))

})


// This will execute 1st as Node js Execute Top Level Code First 
console.log("Hello  Form TopLevelCode");


//  OutPut = 
/* 
    Hello  Form TopLevelCode
    Timer 1 Finsihed
    Immidiate 1 finished
    File IO is Finished

    -> These are not running in Event LOOP
    -----------

    (These 2 are running in event loop with no timer hence execute immidiately)
     1-> Immidiate 2 finished
     2-> Timer 2 Finsihed

    -------  -> here it is in Event Loop and so didint Exit Immediatly

    Timer 3 Finsihed (exited)

*/