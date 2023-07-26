const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database')
const Product = require("./models/product")
const User = require("./models/user")
const Cart = require("./models/cart")
const CartItem = require("./models/CartItem")
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findAll({ where: { id: 1 } })
        .then(user => {
            req.user = user[0]
            next()
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
})
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

sequelize.sync({ force: true })
    .then(() => {
        return User.findAll({ where: { id: 1 } });
    })
    .then(user => {
        if (!user[0]) {
            return User.create({ name: "Shubham", email: "shubham5656@gmail.com" })
        }
        return user[0]
    })
    .then(user => {
        return user.createCart()
    })
    .then(() => {
        app.listen(3000, () => {
            console.log("please click on this with ctrl+left click http://localhost:3000")
        })
    })
    .catch(err => console.log(err))

    ;
