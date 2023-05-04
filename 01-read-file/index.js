const fs = require('fs');
const path = require('path');
const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'),'utf8');
readableStream.on('data', chunk => console.log(chunk));

// node 01-read-file