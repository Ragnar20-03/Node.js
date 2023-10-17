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

                crypto.pbkdf2('password' , 'salt' , 100000 , 1024 ,'sha512' , () => {
                    console.log(` ${Date.now() - start}  Password Incrypted`);
                })
                
                crypto.pbkdf2('password' , 'salt' , 100000 , 1024 ,'sha512' , () => {
                    console.log(` ${Date.now() - start}  Password Incrypted`);
                })

                crypto.pbkdf2('password' , 'salt' , 100000 , 1024 ,'sha512' , () => {
                    console.log(` ${Date.now() - start}  Password Incrypted`);
                })

                crypto.pbkdf2('password' , 'salt' , 100000 , 1024 ,'sha512' , () => {
                    console.log(` ${Date.now() - start}  Password Incrypted`);
                })

})


// This will execute 1st as Node js Execute Top Level Code First 
console.log("Hello  Form TopLevelCode");


//  OutPut = 
/* 
for Thread 1 -> 

Hello  Form TopLevelCode
Timer 1 Finsihed
Immidiate 1 finished
File IO is Finished
-----------
Process.nextTick
Immidiate 2 finished
Timer 2 Finsihed

        Time is Increasing as Thread size is only one
        
        ---------------
        2622  Password Incrypted
        ---------------
        Timer 3 Finsihed
        5241  Password Incrypted
        ---------------
        7941  Password Incrypted
        ---------------
        10876  Password Incrypted


======================================================
for Thread 2 -> 


Hello  Form TopLevelCode
Timer 1 Finsihed
Immidiate 1 finished
File IO is Finished
-----------
Process.nextTick
Immidiate 2 finished
Timer 2 Finsihed
        ---------------
         2771  Password Incrypted
         2802  Password Incrypted
        ---------------
        Timer 3 Finsihed
         5403  Password Incrypted
         5474  Password Incrypted

==========================================================
*/