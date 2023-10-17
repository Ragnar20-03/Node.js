const { log } = require('console');
const fs = require('fs')
const crypto = require('crypto')

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 4;

// new -> Crypto , ThreadPool Threads Changing

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

    process.nextTick(() => console.log("Process.nextTick"))


    // These is Heacy Task and we created its Four Instances and they execute At Same time because all heavy tasks like File I/O , Cryptography , etc ..  are goes to ThreadPool Which Have 4 threads  ,but we can Increase Threads 
    // USING -> process.env.UV_THREADPOOL_SIZE = 1 (no . of threads)

                crypto.pbkdf2Sync('password' , 'salt' , 100000 , 1024 ,'sha512' )
                console.log(` ${Date.now() - start}  Password Incrypted`)

                
                crypto.pbkdf2Sync('password' , 'salt' , 100000 , 1024 ,'sha512' )
                console.log(` ${Date.now() - start}  Password Incrypted`)

                crypto.pbkdf2Sync('password' , 'salt' , 100000 , 1024 ,'sha512' )
                console.log(` ${Date.now() - start}  Password Incrypted`)

                crypto.pbkdf2Sync('password' , 'salt' , 100000 , 1024 ,'sha512' )
                console.log(` ${Date.now() - start}  Password Incrypted`)
})


// This will execute 1st as Node js Execute Top Level Code First 
console.log("Hello  Form TopLevelCode");


//  OutPut = 
/* 
Hello  Form TopLevelCode
Timer 1 Finsihed
Immidiate 1 finished
File IO is Finished

(this is happen because of synchronous function , which does not go to event loop and hence not goes to thread pool , and hence ther is no mean of having thread size , AND HENCE It is BLOCKING IO)
-----------
    2686  Password Incrypted
-----------
    5359  Password Incrypted
-----------
    8030  Password Incrypted
-----------
    10654  Password Incrypted
Process.nextTick
Immidiate 2 finished
Timer 2 Finsihed
Timer 3 Finsihed

==========================================================
*/