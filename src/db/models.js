import Sequelize from 'sequelize'

const MessageModelDefinition = {
    userName: Sequelize.STRING,
    message: Sequelize.TEXT,
    timestamp: Sequelize.DATE
}

export {MessageModelDefinition}