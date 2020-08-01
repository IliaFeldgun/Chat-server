import {MessageModel} from '../db/sequelize'
import Emitter from './emitter'

const LAST_MESSSAGES_AMOUNT = 10
let users = []
const removeUser = (userName) => {
    if (userName) {
        users = users.filter((user) => {
            return userName !== user
        })
    }
}
const app = (socketServer) => {
    socketServer.on('connection', (socket) => {
        Emitter.sendUsers(socketServer, users)
        Emitter.sendLastMessages(socket, LAST_MESSSAGES_AMOUNT)

        socket.on('message', (message) => {
            if (socket.userName) {
                message.userName = socket.userName
                MessageModel.create(message)
        
                Emitter.sendMessage(socketServer, message)
            }
        })
        socket.on('disconnect', () => {
            removeUser(socket.userName)
        })
        socket.on('login', (userName) => {
            if (socket.userName !== userName) {
                removeUser(socket.userName)
                socket.userName = userName

                users.push(userName)
            }
        
            socket.emit('logged-in', {
                userName
            })
        
            Emitter.sendUsers(socketServer, users)
        })
    })
}
export default app