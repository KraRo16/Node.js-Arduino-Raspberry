// const http = require('http');
// const fs = require('fs');
// const index = fs.readFileSync('index.html');
// const { ReadlineParser } = require('@serialport/parser-readline');
// const { SerialPort } = require('serialport'); 

// const port = new SerialPort({path:'COM12',
//   baudRate: 9600,
//   dataBits: 8,
//   parity: 'none',
//   stopBits: 1,
//   flowControl: false
// });
// const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));


// port.pipe(parser);

// const app = http.createServer(function(req, res) {
//   res.writeHead(200, { 'Content-Type': 'html' });
//   res.end(index);
// });

// const { Server } = require("socket.io");
// const io = new Server();

// io.on('connection', function(socket) {
    
//   console.log('Node is listening to port');
    
// });

// parser.on('data', (data) => {
//   console.log('Received data from port: ' + data);
//   io.emit('data', data);
// });

// app.listen(3000);

const {SerialPort} = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = new SerialPort({path:'COM12',
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});
const parser = new ReadlineParser();
port.pipe(parser);

let data = '';

parser.on('data', (line) => {
  console.log(`Received data: ${line}`);
  data = line;
  io.emit('data', data); // send data to all connected clients
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});