
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer((req, res) => {
    res.end("Hey heyyyy.... heyyyyy...heyyyy");
});

server.listen(3000);

const io = socketio.listen(server);
io.on("connection", (socket) => {
    socket.on("joinRoom", (data) => {
        socket.join(data.name, () => {
            
            console.log("Sınıfın adı : " + data.name + " odaya giriş yapıldı...");

            //let count = io.sockets.adapter.rooms[data.name].length;
            //socket.to(data.name).emit("new join"); // Kendisi hariç odadaki herkese gönderilir.
            //io.to(data.name).emit("new join");     // Kendisine ve odadaki herkese gönderir.

            io.to(data.name).emit("new join", { count: getOnlineCount(io, data) });

            socket.emit("log", { message: "Odaya girdiniz.  " });

            console.log("birisi odaya girdi...");

        });


    });

   

});

const getOnlineCount = (io, data) => {
    const room = io.sockets.adapter.rooms[data.name];
    return room ? room.length : 0;
};