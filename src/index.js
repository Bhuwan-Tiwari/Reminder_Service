const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./config/serverConfig')
const {sendBasicEmail}= require('./services/email-service')
const cron = require('node-cron')
const TicketController = require('./controllers/ticket-controller')
const job = require("./utils/job")




const setupAndStartServer = () => {
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

  app.post('/api/v1/tickets',TicketController.create)


    app.listen(PORT, async () => {
        console.log(`server started at port ${PORT}`)
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
    })

}
setupAndStartServer();