const myseql = require("mysql")

const pool = myseql.createConnection({
    host: "localhost",
    user: "root",
    database: "node-complete",
    password: "Shubham5659102"
})
module.exports = pool.promise();