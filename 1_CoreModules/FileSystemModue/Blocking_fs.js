const { log } = require('console');
const fs = require('fs')

console.log("File System Module Intoduction");

// ########### Blocking Synchronous Way 
// sync - > Synchronus File reading
const readBuffer = fs.readFileSync('./Demo.txt' , 'utf-8' , )
console.log(readBuffer);

const writeBuffer =`"This is File Writing Buufer Created On  ${Date.now()}` ; 

 fs.writeFileSync('./DemoWrite.txt',  writeBuffer)

console.log(writeRet);


// Synchronus will be broke down if there are Millions of users 

// Users will have to wait until operation is finsished 
// This is Draw abck of Synchronous