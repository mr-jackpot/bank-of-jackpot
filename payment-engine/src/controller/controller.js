const Pool = require('pg').Pool
const pool = new Pool({
  user: 'payeng',
  host: 'localhost',
  database: 'transactions',
  password: 'admin',
  port: 5432,
})

const serverStatus = (req, res) => {
  res.send("Server running.")
}

const makePayment = (req, res) => {
    
}

module.exports = {serverStatus, makePayment}