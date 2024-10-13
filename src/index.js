const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
//const { sendBasicEmail } = require("./services/email-service");
//const cron = require("node-cron");
const TicketController = require("./controllers/ticket-controller");
const job = require("./utils/job");

const { subscribeMessage, createChannel } = require("./utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("./config/serverConfig");

const EmailService = require("./services/email-service");

const setupAndStartServer = async() => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/reminderservice/api/v1/tickets", TicketController.create);

  const channel = await createChannel();
  subscribeMessage(channel,EmailService,REMINDER_BINDING_KEY)


  app.listen(PORT, async () => {
    console.log(`server started at port ${PORT}`);
    job();
    // sendBasicEmail(
    //     'test@gmail.com',
    //     'bhuwan.21ug1088@iiitranchi.ac.in',
    //     "remainder service",
    //     "hope this remainder service message reached to you"
    // )

    // cron.schedule('* * * * * *', () => {
    //     console.log('running a task every secound');
    //   });
  });
};
setupAndStartServer();
