const Sequelize = require("sequelize")

const sequelize = new Sequelize('nodecomplete', 'root','Shubham5659102',{
    dialect:'mysql',
    host:'localhost'
}) 

module.exports =sequelize