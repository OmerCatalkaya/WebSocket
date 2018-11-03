const http = require("http");
const socketio = require("socket.io");
const server = http.createServer((req, res) => {
  res.end("hey!");
});

server.listen(3000);

//const OjectKeys = Object.keys({ a: 1, b: 2, c: 3 });
const OjectKeys = Object.keys([ "A", "B", "C" ]);
console.log(OjectKeys);

const io = socketio.listen(server);

io.on("connection", socket => {
  console.log(socket.id);
  socket.join("room 1");
  socket.join("room 2");
  socket.join("room 3", () => {
    const rooms = Object.keys(socket.rooms);
    console.log(rooms);
  });

  socket.on("joinRoom", data => {
    socket.join(data.name, () => {
      io.to(data.name).emit("new join", { count: getOnlineCount(io, data) }); // Kendisine ve odadaki herkese gönderir.
      //socket.to(data.name).emit('new join', { count: getOnlineCount(io, data) }); // Kendisi hariç odadaki herkese gönderilir.
      socket.emit("log", {
        message: "Sınıfın adı : " + data.name + " odaya giriş yapıldı..."
      });
    });
  });

  socket.on("leaveRoom", data => {
    socket.leave(data.name, () => {
      io.to(data.name).emit("leavedRoom", { count: getOnlineCount(io, data) });
      socket.emit("socket.leaved", {
        message: "Sınıfın adı : " + data.name + " odasından ayrıldınız..."
      });
    });
  });
});

const getOnlineCount = (io, data) => {
  const room = io.sockets.adapter.rooms[data.name];
  return room ? room.length : 0;
};
