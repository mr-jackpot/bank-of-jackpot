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
  res.send("Connected!");
  client.release();
};

const getAllPayments = async (req, res) => {
  console.log("Incoming request");
  const result = await pool.query("SELECT * FROM event ORDER BY id ASC;");
  res.send(result.rows);
};

const makePayment = async (req, res) => {
  const { sender, reciever, amount } = req.body;
  const date = new Date();
  const result = await pool.query(
    "INSERT INTO event (sender, reciever, amount) values ($1, $2, $3);",
    [sender, reciever, amount]
  );
  res.status(201).send("Payment successful!");
};

module.exports = { serverStatus, makePayment, getAllPayments };
