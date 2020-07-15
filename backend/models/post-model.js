const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect')

const Post = sequelize.define('post', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Post