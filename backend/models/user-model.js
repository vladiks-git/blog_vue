const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect')

const User = sequelize.define('user', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    }
})

module.exports = User