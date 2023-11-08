const app = require('./main');
const { db } = require('./database/db.connection');
const socketsEvents = require('./sockets.events');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const server = createServer(app);
const io = new Server(server, {
  path: "/my-custom-path/",
  connectionStateRecovery: {
    maxDisconnectionDuration: 60000,
  },
});
const PORT = process.env.PORT;

db.on('error', () => {
  console.error.bind(console, 'Error de conexión a MongoDB:');
});
db.once('open', async () => {
  // const collections = await db.db.collections();
  // for (let collection of collections) {
  //   await collection.drop();
  // }

  console.log(`Conectado a la base de datos MongoDB ${db.name}`);
});

socketsEvents(io);

server.listen(PORT, () => {
  console.log(`server runnign on port ${PORT} 😎`);
});
