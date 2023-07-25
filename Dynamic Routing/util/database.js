const myseql = require("mysql2")

const pool = myseql.createConnection({
    host: "localhost",
    user: "root",
    database: "nodecomplete",
    password: "Shubham5659102"
})
module.exports = pool.promise();