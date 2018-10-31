
const http = require("http");

const socketio = require("socket.io");

const server = http.createServer((req, res) => {

    res.end("Hey heyyyy.... heyyyyy...");

});

server.listen(3000);

const io = socketio.listen(server);

io.sockets.on("connection", (socket) => {

    console.log("Kullanıcı server'a bağlandı...");

    // const interval = setInterval(function () {
    //     socket.emit("merhabaDe");
    // }, 2000);

    setTimeout(() => {
        socket.emit("merhabaDe", { country: "Türkiye", name: "Mehmet" });
    }, 3000);

    socket.on("selamVer", (data) => {

        console.log("Selamün aleyküm....");
        console.log("Gelen Veri : ", data.city);
        console.log("Gelen Veri : ", data.name);

    });

    socket.on("disconnect", () => {

        console.log("Kullanıcı server'dan ayrıldı...");

    });

});