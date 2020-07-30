import SocketIO from 'socket.io'

const users = []

const app = (socketServer) => {
    socketServer.on('connection', (socket) => {
        sendUsers()

        socket.on('message', (message) => {
            if (socket.userName) {
                socketServer.emit('message', {userName: socket.userName, message})
            }
        })

        socket.on('disconnect', () => {

            users.filter((user) => {
                return socket.userName !== user
            })
        })

        socket.on('login', (userName) => {
            socket.userName = userName

            users.push(userName)
            sendUsers()
        })
    })

    const sendUsers = () => {
        socketServer.sockets.emit('users', users)
    }
}
export default app