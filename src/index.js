import dotenv from 'dotenv'
dotenv.config()

import app from './src/api/app'
// import socketServer from './src/api/socket/socketServer'
const port = process.env.PORT || 8080

const server = app.listen( port, () => {
    console.log(`Listening on ${port}`)
})
// socketServer.bind(server)

export default server