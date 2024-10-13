const cron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/emailConfig");

//every 5 min we will check are thier any pending emails ehich was expected to be sent by now and is pending

const setupJobs = () => {
  //cron.schedule('*/2 * * * *',async ()=>
  cron.schedule("* * * * *", async () =>
    //cron for 1 min
    {
      const response = await emailService.fetchPendingEmails();

      //in response=all notificationTickets whose status is pending
      //response.forEach((notificationTicket) i.e notificationTicket =email
      response.forEach((email) => {
        sender.sendMail(
          {
            to: email.recepientEmail,
            subject: email.subject,
            text: email.content,
          },
          async (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
              await emailService.updateTicket(email.id, { status: "SUCCESS" });
            }
          }
        );
      });
      console.log(response);
    }
  );
};
module.exports = setupJobs;
