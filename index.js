var SerialPort = require("serialport"),
    nmea = require("nmea-simple");

var port = new SerialPort(
    "/dev/cu.usbserial-183758",
    {
        baudrate: 4800,
        dataBits: 8,
        parity: "none",
        stopBits: 1,
        parser: SerialPort.parsers.byteDelimiter([0x0d,0x00]),
        autoOpen: false
    }
);

port.on("data", function (bytes) {
    var rawSentence = Buffer.from(bytes).toString("ascii");
    try {
        var sentence = nmea.parseNmeaSentence(rawSentence);
        console.log(sentence);
    } catch (err) {
        console.error(err.message);
    }
});

port.open();
