const TicketService = require('../services/email-service')

const create = async (req, res) => {
    try {
        const response = await TicketService.createNotification(req.body)
        res.status(201).json({
            success: true,
            data: response,
            err: {},
            message: 'notificationticket created'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: response,
            err: error,
            message: 'unable to create  notificationTicket'
        })
    }

}
module.exports = {
    create
}