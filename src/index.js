const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./config/serverConfig')
const {sendBasicEmail}= require('./services/email-service')
const setupAndStartServer = () => {
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.listen(PORT, async () => {
        console.log(`server started at poer ${PORT}`)
        sendBasicEmail(
            'test@gmail.com',
            'bhuwan.21ug1088@iiitranchi.ac.in',
            "remainder service",
            "hope this remainder service message reached to you"
        )
    })

}
setupAndStartServer();