// const express = require('express');
// const spi = require('spi-device');

// const app = express();

// const config = {
//   mode: 1,
//   chipSelect: 0,
//   maxSpeedHz: 1000000,
//   bitOrder: spi.ORDER_MSB_FIRST,
//   bitsPerWord: 8
// };

// const device = spi.open(0, 0, config, err => {
//   if (err) throw err;
// });

// setInterval(() => {
//   const message = [{    sendBuffer: Buffer.from([0xff, 0xff]),
//     receiveBuffer: Buffer.alloc(2),
//     byteLength: 2,
//     speedHz: 1000000
//   }];

//   device.transfer(message, (err, message) => {
//     if (err) throw err;

//     const data = ((message[0].receiveBuffer[0] << 8) + message[0].receiveBuffer[1]).toString(2);
//     const error = ((0b01000000) & message[0].receiveBuffer[0]) >> 6;
//     const parity = ((0b10000000) & message[0].receiveBuffer[0]) >> 7;

//     message[0].receiveBuffer[0] = (0b00111111) & message[0].receiveBuffer[0];
//     const getData = (message[0].receiveBuffer[0] << 8) + message[0].receiveBuffer[1];

//     console.log("Data: " + data);
//     console.log("Error: " + error);
//     console.log("Parity: " + parity);
//     console.log("Get Data: " + getData);

//     // Send the received data to the client
//     io.emit('data', {
//       data: data,
//       error: error,
//       parity: parity,
//       getData: getData
//     });
//   });
// }, 1000); // Send the message every second

// // Serve the index.html file
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // Set up the socket.io server
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

// io.on('connection', socket => {
//   console.log('Client connected');

//   // Send the received data to the client when requested
//   socket.on('getData', () => {
//     console.log('getData request received');
//     const message = {
//       data: data,
//       error: error,
//       parity: parity,
//       getData: getData
//     };
//     io.emit('data', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// server.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });

// ////////////////////////////////////////////////////////////////////////////
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Real-time data</title>
//   <script src="https://cdn.socket.io/socket.io-3.1.3.min.js"></script>
//   <script>

//     const socket = io('http://localhost:3000');
    
//     socket.on('data', data => {
//       // Update the HTML elements with the received data
//       document.getElementById('data').innerHTML = data.data;
//       document.getElementById('error').innerHTML = data.error;
//       document.getElementById('parity').innerHTML = data.parity;
//     });
    
//     // Request data from the server
//     socket.emit('data');
//   </script>
// </head>
// <body>
//   <h1>Real-time data</h1>
//   <p>Data: <span id="data"></span></p>
//   <p>Error: <span id="error"></span></p>
//   <p>Parity: <span id="parity"></span></p>
// </body>
// </html>