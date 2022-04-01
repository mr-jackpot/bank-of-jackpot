const Pool = require("pg").Pool;
const pool = new Pool({
  user: "payeng",
  host: "localhost",
  database: "transactions",
  password: "admin",
  port: 5432,
});

const serverStatus = (req, res) => {
  res.send("Server running.");
};

const getAllPayments = (req, res) => {
  console.log("Incoming request")
  pool.query("SELECT * FROM event;"),
    (error, results) => {
      if (error) {
        res.send(error.message);
        throw error.message;
      }
      res.status(200).send(results.rows);
    };
};

const makePayment = (req, res) => {
  const { sender, reciever, amount } = req.body;
  const date = new Date();

  pool.query(
    "INSERT INTO event (sender, reciever, amount) values ($1, $2, $3);",
    [sender, reciever, amount],
    (error, results) => {
      if (error) {
        res.send(error.message);
        throw error.message;
      }
      res.status(201).send(`Payment Successful.`);
    }
  );
};

module.exports = { serverStatus, makePayment, getAllPayments };
