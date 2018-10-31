
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer((req, res) => {
    res.end("Hey heyyyy.... heyyyyy...");
});

server.listen(3000);
const io = socketio.listen(server);
const nsp = io.of("/93creative");


nsp.on("connection", (socket) => {

    console.log("Kullanıcı bağlandı...");


    socket.on("isim yaz", () => {
        nsp.emit("Herkese gönder", { name: "Ömer" });
    });


});