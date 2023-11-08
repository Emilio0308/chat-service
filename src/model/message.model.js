const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const chatSchema = new mongoose.Schema(
  {
    participants: [String],
    multiChat: { type: Boolean, default: false },
    chatName: [String],
    chatGroupName: { type: String, default: '' },
    messages: [
      {
        from: String,
        to: String,
        text: String,
        img: String,
        timestamp: { type: Date, default: Date.now },
        recibido: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

// Creación del modelo 'Conversacion' basado en el esquema
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
