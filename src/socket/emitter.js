import {MessageModel} from '../db/sequelize'

class Emitter {
    static sendUsers = (socketServer, users) => {
        socketServer.sockets.emit('users', users)
    }

    static sendLastMessages = (socket, limit) => {
        const lastMessages = MessageModel.findAll({
            limit,
            order: [
                ['timestamp', 'DESC']
            ]
        })

        lastMessages.then((messages) => {
            socket.emit('bulk-message', messages)
        })
    }

    static sendLoggedIn = (socket, userName) => {
        socket.emit('logged-in', {
            userName
        })
    }

    static sendMessage = (socketServer, message) => {
        socketServer.emit('message', message)
    }
}

export default Emitter