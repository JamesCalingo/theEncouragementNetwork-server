const Message = require("../../models/Message");

module.exports = {
  Message: {
    likes: (parent) => {
      console.log(parent);
      return parent.likes;
    },
  },
  Query: {
    async getMessages() {
      try {
        const messages = await Message.find().sort({ createdAt: -1 });
        return messages;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMessagesByLikes() {
      try {
        const messages = await Message.find().sort({ likes: -1 });
        return messages;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMessageByID(_, { messageID }) {
      try {
        const message = await Message.findById(messageID);
        if (message) {
          return message;
        } else {
          throw new Error("Couldn't find any messages matching the ID.");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async postMessage(_, { body }) {
      if (body.trim() === "") {
        throw new Error("Please input a message.");
      }
      const newMessage = new Message({
        body,
        createdAt: new Date().toISOString(),
      });
      const message = await newMessage.save();
      return message;
    },
    async likeMessage(_, { messageID }) {
      const message = await Message.findById(messageID);
      if (message) {
        message.likes += 1;
        await message.save();
        return message;
      } else {
        throw new Error("Message not found.");
      }
    },
    async reportMessage(_, { messageID }) {
      const message = await Message.findById(messageID);
      if (message) {
        message.flagged = !message.flagged;
        await message.save();
        return message;
      } else {
        throw new Error("Message not found.");
      }
    },
    async deleteMessage(_, { messageID }) {
      try {
        const message = await Message.findById(messageID);
        await message.delete();
        return "BALEETED! Oops, I meant...DELETED!";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
