import dotenv from 'dotenv'
dotenv.config()

import SocketIO from 'socket.io'

import app from './socket/app'
const port = process.env.PORT || 8080
const socketServer = SocketIO.listen(port)
app(socketServer)