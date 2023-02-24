
// const { SerialPort } = require('serialport'); 
// const { ReadlineParser} = require('@serialport/parser-readline');


// // const portName = "COM5";
// const port = new SerialPort({ path:'COM10',  baudRate: 9600 });
// const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));


// // Read the port data
// port.on("open", () => {
//   console.log('serial port open');
// });
// parser.on('data', data =>{
//   console.log('got word from arduino:', data);
// });
//   port.write('hello from node\n', (err) => {
//     if (err) {
//       return console.log('Error on write: ', err.message);
//     }
//     console.log('message written');
//   });





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





  // var SerialPort = require("serialport").SerialPort
// var serialPort = new SerialPort({path: 'COM5',    baudRate: 9600
//         // dataBits: 8,
//         // parity: 'none',
//         // stopBits: 1,
//         // flowControl: false
//   });

// serialPort.on("open", function () {
//     console.log('open');
//     serialPort.on('data', function(data) {
//         console.log('data received: ' + data);
//         });
//     serialPort.write("Hello from Raspberry Pi\n", function(err, results) {
//         console.log('err ' + err);
//         console.log('results ' + results);
//         });
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const http = require('http');
const fs = require('fs');
const index = fs.readFileSync('index.html');
const { ReadlineParser } = require('@serialport/parser-readline');
const { SerialPort } = require('serialport'); 
// var SerialPort = require('serialport');
// const parsers = SerialPort.parsers;


// const parser = new parsers.ReadlineParser({
//   delimiter: '\r\n'
// });

const port = new SerialPort({path:'COM10',
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
// const parser = new parsers.ReadlineParser({
//   delimiter: '\r\n'
// });

port.pipe(parser);

const app = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(index);
});

// const io = require('socket.io').listen(app);
const { Server } = require("socket.io");
const io = new Server();

io.on('connection', function(socket) {
    
  console.log('Node is listening to port');
    
});

parser.on('data', ( data ) => {
    
  console.log('Received data from port: ' + data);
  io.emit('data', data);

});

app.listen(3000);

