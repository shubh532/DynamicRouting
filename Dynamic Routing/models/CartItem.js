const Sequelize = require('sequelize')

const sequelize = require("../util/database")

const CartItem = sequelize.define('cartItems', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    qauntity:Sequelize.INTEGER
})

module.exports = CartItem