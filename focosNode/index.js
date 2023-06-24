const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
const { SerialPort, ReadlineParser } = require('serialport');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const baud = 115200;

const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: baud }, function (err) {
    if (err) {
        return console.log('Error: ', err.message)
    }
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("state", (msg) => {
        console.log(msg);
        let focoJson = {
            "IN1": bool2Relay(msg[0]),
            "IN2": bool2Relay(msg[1]),
            "IN3": bool2Relay(msg[2]),
            "IN4": bool2Relay(msg[3]),
        }
        let msgJson = JSON.stringify(focoJson);
        console.log(msgJson);
        port.write(msgJson + '\n', (err) => {
            if (err) {
                return console.log('Error on write: ', err.message)
            }
        })
    });
});

function bool2Relay(boolValue) {
    let relayValue = 1;
    boolValue ? relayValue = 1 : relayValue = 0;
    return relayValue;
}

server.listen(3000, () => {
    console.log('listening on *:3000');
});
