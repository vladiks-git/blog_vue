const Sequelize = require('sequelize')

const sequelize = new Sequelize('myApp', 'postgres', 'postgres',{
    dialect: 'postgres'
})

module.exports = sequelize