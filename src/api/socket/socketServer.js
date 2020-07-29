import SocketIO from 'socket.io'
import sharedSession from 'express-socket.io-session'

import session from '../session'
const socketServer = SocketIO()

socketServer.on("connnection", (socket) => {
    console.log(`user connected`)
})
socketServer.use(sharedSession(session, {saveUninitialized: false, autoSave: true}))

export default socketServer