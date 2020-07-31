import SocketIO from 'socket.io'
import {MessageModel} from '../db/sequelize'
let users = []
const app = (socketServer) => {
    socketServer.on('connection', (socket) => {
        sendUsers()
        sendLastMessages(socket, 10)
        socket.on('message', (message) => {
            if (socket.userName) {
                message.userName = socket.userName
                MessageModel.create(message)

                socketServer.emit('message', message)
            }
        })

        socket.on('disconnect', () => {
            
            users = users.filter((user) => {
                return socket.userName !== user
            })
        })

        socket.on('login', (userName) => {
            if (socket.userName !== userName) {
                socket.userName = userName
                users.push(userName)
            }

            socket.emit('logged-in', {
                userName
            })

            sendUsers()
        })
    })

    const sendUsers = () => {
        socketServer.sockets.emit('users', users)
    }

    const sendLastMessages = (socket, limit) => {
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
}
export default app