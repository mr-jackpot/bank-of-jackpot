// Move pool stuff to a file in ../models/
const axios = require("axios").default;
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "payeng",
  host: "localhost",
  database: "transactions",
  password: "admin",
  port: 5432,
});

const serverStatus = async (req, res) => {
  const client = await pool.connect();
  res.send("Database Connected!");
  client.release();
};

const getAllPayments = async (req, res) => {
  const result = await pool.query("SELECT * FROM event ORDER BY id ASC;");
  res.send(result.rows);
};

const getPaymentsForCustomer = async (req, res) => {
  customerId = req.params.id;
  let result
  try {
    result = await pool.query(
      "SELECT * FROM event\
      WHERE sender=$1\
      OR reciever=$1\
      ORDER BY date DESC;",
      [customerId]
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  res.status(200).send(result.rows)
};

const makePayment = async (req, res) => {
  const { sender, reciever, amount } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO event (sender, reciever, amount, date) values ($1, $2, $3, $4);",
      [sender, reciever, amount, new Date()]
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

  axios
    .put("http://localhost:3300/api/accounts/" + sender, {
      account_balance: -amount,
    })
    .then(function (response) {
      console.log("Request successful")
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    });

  axios
    .put("http://localhost:3300/api/accounts/" + reciever, {
      account_balance: amount,
    })
    .then(function (response) {
      console.log("Request successful")
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    });

  res.status(201).send({ message: "Payment successful!" });
};

module.exports = {
  serverStatus,
  makePayment,
  getAllPayments,
  getPaymentsForCustomer,
};
