const amqplib = require("amqplib");
const { EXCHANGE_NAME, MESSAGE_BROKER_URL } = require("../config/serverConfig");
const EmailService = require("../services/email-service");

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (err) {
    throw err;
  }
};

const subscribeMessage = async (channel, service, bindingKey) => {
  try {
    const applicationQueue = await channel.assertQueue("QUEUE_NAME");

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, bindingKey);

    await channel.consume(applicationQueue.queue, (msg) => {
      console.log("received message");
      console.log(msg.content.toString());
      const payload = JSON.parse(msg.content.toString());
      //service.subscribeEvents(payload);
      EmailService.subscribeEvents(payload)
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  subscribeMessage,
  createChannel,
};
