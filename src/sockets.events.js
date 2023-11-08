const Chat = require('./model/message.model');

const contacts = [
  {
    id: '33e09657-3dd9-48b8-a609-09a6f0679f20',
    name: 'testouser2',
    email: 'test@gmail',
    password: '$2a$12$RGhxSau5l5PoiDW3x59C9.vzGyVh1pgvoiQEHt2KwaC/qiTmLW6Iy',
    imgProfile: 'http://localhost:7000/public/img/user_img.png',
    status: true,
    createdAt: '2023-11-03T05:49:13.609Z',
    updatedAt: '2023-11-03T05:49:13.609Z',
  },
  {
    id: '86abf78a-8525-4812-9d46-5c90970a7709',
    name: 'testouser23',
    email: 'test23@gmail',
    password: '$2a$12$4xmu13MjP2skfZOpwrFouOSYBH7515SpzzzRMfh3Nj6vo3zXbC.Uy',
    imgProfile: 'http://localhost:7000/public/img/user_img.png',
    status: true,
    createdAt: '2023-11-05T03:21:57.822Z',
    updatedAt: '2023-11-05T03:21:57.822Z',
  },
  {
    id: 'da4daa29-f9d3-4448-9866-7fdb030f797a',
    name: 'userprueba',
    email: 'test123@gmail',
    password: '$2a$12$dss/zdjDGA5nJlNXhq7kTOkDvk1AJBWeElcSEvbDLDH4fVAquu6sa',
    imgProfile: 'http://localhost:7000/public/img/user_img.png',
    status: true,
    createdAt: '2023-11-05T03:22:19.249Z',
    updatedAt: '2023-11-05T03:22:19.249Z',
  },
  {
    id: '1a34ab04-96b3-40ac-831a-79d2cf4d0c82',
    name: 'userprueba2',
    email: 'test1234@gmail',
    password: '$2a$12$UdUe.513du4ryLXuyZvn5Ofe2vCPy028Ji0egkwJ394QwwGqRWAfa',
    imgProfile: 'http://localhost:7000/public/img/user_img.png',
    status: true,
    createdAt: '2023-11-05T03:22:27.472Z',
    updatedAt: '2023-11-05T03:22:27.472Z',
  },
  {
    id: 'fd92b8ef-c314-4c6d-8830-d0df328f5a9f',
    name: 'accessuser',
    email: 'acceslancer@gmail.com',
    password: '$2a$12$C6PAG9Gahi3JfWECoSYbqO0ai7CYJjak8W0/vCPUcHG0Slozm5pcG',
    imgProfile: 'http://localhost:7000/public/img/user_img.png',
    status: true,
    createdAt: '2023-11-07T14:42:01.591Z',
    updatedAt: '2023-11-07T14:42:01.591Z',
  },
  {
    id: '34f3d6fb-81d4-43ba-82ee-1dce2cb478c2',
    name: 'emilio',
    email: 'emiliorivasruiz@gmail.com',
    password: '$2a$12$quRFyHwE3wl9LHtmzaJhpe1vA4VdF6gFN1LNbRDLIJ/m3u5wNEaZy',
    imgProfile: 'http://localhost:7000/public/img/user_img.png',
    status: true,
    createdAt: '2023-11-07T14:42:42.917Z',
    updatedAt: '2023-11-07T14:42:42.917Z',
  },
];

const socketsEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('disconnect', () => {
      console.log('usuario desconectado');
    });

    socket.on('create-chat', async ({ id, name, contactId, contactName }) => {
      //buscar si el chat ya existe
      const participants = [id, contactId];
      const chat = await Chat.findOne({
        participants: {
          $all: participants,
        },
        multiChat: false,
      });
      //si el chat no existe lo creamos
      if (!chat) {
        console.log('creando chat');
        const NewChat = new Chat({
          participants,
          chatName: [name, contactName],
          messages: [],
        });
        await NewChat.save();
        //responder con todos los chats de del usuario
        return socket.emit('create-chat', NewChat);
      }
      return socket.emit('create-chat', chat);
    });

    socket.on('get-all-contacts', async (UserId) => {
      socket.emit('get-all-contacts', contacts);
    });

    socket.on('joinRoom', (roomChatId) => {
      console.log('evento join', roomChatId);
      socket.join(roomChatId);
    });

    socket.on('chat menssage', async (message) => {
      const { msg, userId, contactId, chatId } = message;

      const chat = await Chat.findById(chatId);

      if (!chat) {
        return socket.emit('chat menssage', {
          msg: 'error',
          userId,
          contactId,
          chatId,
        });
      }
      chat.messages.push({
        from: userId,
        to: contactId,
        text: msg,
        img: '',
      });
      const currentChat = await chat.save();
      message.currentChat = currentChat;

      console.log(chat);

      io.to(chatId).emit('chat menssage', message);
    });
  });
};

module.exports = socketsEvents;
