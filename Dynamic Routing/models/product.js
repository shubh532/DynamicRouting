const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const removeProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};



module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        console.log(this, "thisssssssssssss")
        const existingProductIndex = products.findIndex(prod => prod.id === this.id)
        const updatedProduct = [...products]
        updatedProduct[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProduct), err => {
          console.log(err);
        })
      } else {
        this.id = Math.random().toString()
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }
  static deleteProductById(id) {
    removeProductsFromFile(products => {
      const product =products.find(prod=>prod.id===id)
      const UpdatedProduct = products.filter(prod => prod.id !== id)
      fs.writeFile(p, JSON.stringify(UpdatedProduct), err => {
        if (!err) {
          Cart.removeProductFromCart(id, product.price)
        }
      })
    })
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static FindById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }
};
