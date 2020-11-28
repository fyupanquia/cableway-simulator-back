const app = require("express")();
const cors = require("cors");
//app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const PORT = 8000;
const characters = [];
io.on("connection", (client) => {
  let clientCharacter;
  client.on("disconnect", () => {
    delete characters[clientCharacter.id];
    /* … */
    console.log("disconnected!", clientCharacter);
    io.emit("charactersNotify", Object.values(characters));
  });

  client.on("addCharacter", (character) => {
    if (!character || !character.id) return false;
    clientCharacter = character;
    characters[character.id] = character;
    console.log(characters);
    io.emit("charactersNotify", Object.values(characters));
  });
});

console.log(`Listening at http://localhost:${PORT}`);
server.listen(PORT);
