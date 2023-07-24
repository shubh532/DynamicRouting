const fs = require("fs")
const path = require("path")

const p = path.join(
    path.dirname(require.main.filename),
    "data",
    "cart.json"
)

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let Cart = { product: [], totalPrice: 0 }
            if (!err) {
                Cart = JSON.parse(fileContent)
            }
            const existingProductIndex = Cart.product.findIndex(prod => prod.id === id)
            const existingProduct = Cart.product[existingProductIndex]
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.qty = updatedProduct.qty + 1
                Cart.product = [...Cart.product]
                Cart.product[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id: id, qty: 1 }
                Cart.product = [...Cart.product, updatedProduct]
            }
            Cart.totalPrice = Cart.totalPrice + +productPrice
            fs.writeFile(p, JSON.stringify(Cart), (err) => {
                console.log(err)
            })
        })
    }

    static removeProductFromCart(id, ProdPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return
            }
            const UpdatedCart = { ...JSON.parse(fileContent) }
            const product = UpdatedCart.product.find(prod => prod.id === id)
            const prodQty = product.qty
            UpdatedCart.product = UpdatedCart.product.filter(prod => prod.id !== id)
            UpdatedCart.totalPrice = UpdatedCart.totalPrice - prodQty * ProdPrice
            fs.writeFile(p, JSON.stringify(UpdatedCart), (err) => {
                console.log(err)
            })
        })
    }
}