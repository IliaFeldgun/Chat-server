import Sequelize from 'sequelize'

const sequelize = new Sequelize(process.env.MYSQL_CONNECTION_STRING, {
  dialect: 'mysql'
})
sequelize.authenticate().then((res) => {
    console.log(`${res} connected`)
}).catch ((err) => {
    console.log(err)
})
const MessageModel = sequelize.define('Message', {
    userName: Sequelize.STRING,
    message: Sequelize.TEXT,
    timestamp: Sequelize.DATE
})
// sequelize.sync({force: true, alter: true}).then((res) => {
sequelize.sync().then((res) => {
    console.log(`synced ${res}`)
}).catch((res) => {
    console.log(`sync failed ${res}`)
})

export {MessageModel}