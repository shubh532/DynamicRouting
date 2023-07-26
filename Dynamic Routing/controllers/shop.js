const Product = require('../models/product');
const Cart = require("../models/cart")


exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      })
    })
    .catch(err => console.log(err))

};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findAll({ where: { id: prodId } })
    .then(product => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product.title,
        path: "/products"
      })
    })
    .catch(err => console.log(err))

}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: 'Your Cart',
            products: products
          })
        })
        .then(err => console.log(err))
    })
    .then(err => console.log(err))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchCart
  let newQauntity = 1
  req.user
    .getCart()
    .then(cart => {
      fetchCart = cart
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0]
      }
      if (product) {
        console.log(product, "PRosmvdlkmfvdkjvn")
        const oldQuantity = product.cartItems.qauntity
        newQauntity = oldQuantity + 1
        return product
      }
      return Product.findByPk(prodId)
    })
    .then(product => {
      return fetchCart.addProduct(product,
        { through: { qauntity: newQauntity } })
    })
    .then(() => {
      res.redirect("/cart")
    })
    .catch(err => console.log(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      const product = products[0]
      return product.cartItems.destroy()
    })
    .then(()=>{
      res.redirect("/cart")
    })
    .catch(err=>console.log(err))


}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
