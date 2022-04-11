const axios = require('axios').default
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "payeng",
  host: "localhost",
  database: "roulette",
  password: "admin",
  port: 5432,
});

const serverStatus = (req, res) => {
  res.status(200).send({ message: "Gambling engine running!" });
};

const playRoulette = async (req, res) => {
  const {player, bet, colour} = req.body
  await axios.post("http://localhost:3100/api/payments", {
    sender: player,
    reciever: "6251bf9e9dc38baf9247c084",
    amount: bet
  })
  wheel = (Math.random() * (36 - 0) + 0).toFixed(0);
  wheelColour = calculateColour(wheel);
  try {
    pool.query(
      "INSERT INTO results (colour, wheel_number, datetime) values ($1, $2, $3);",
      [wheelColour, wheel, new Date()]
    );
  } catch (err) {
    console.log("DATABASE ERROR: " + err.message);
  }

  if (colour == undefined) {
    res.send({ message: "Error! Please choose a colour" });
    return;
  }

  if (colour == wheelColour) {
    money = calculateWinnings(bet, wheelColour)
    await axios.post("http://localhost:3100/api/payments", {
      sender: "6251bf9e9dc38baf9247c084",
      reciever: player,
      amount: money
    })
    res.send({
      number: wheel,
      colour: wheelColour,
      winnings: money,
      message: "Congratulations! You won!",
    });
    return;
  }
  if (colour != wheelColour) {
    res.send({
      number: wheel,
      colour: wheelColour,
      winnings: 0,
      message: "Sorry! You lost!",
    });
    return;
  }
};

const calculateColour = (wheelNumber) => {
  if (wheelNumber == 0) {
    return "green";
  } else if (wheelNumber % 2 == 0) {
    return "red";
  } else {
    return "black";
  }
};

const calculateWinnings = (bet, colour) => {
  if (colour == "green") {
    return bet * 35;
  } else if (colour != "red" || colour != "black") {
    return bet * 2;
  }
};

const gameHistory = async (req, res) => {
  result = ''
  try {
    result = await pool.query("SELECT * FROM results ORDER BY datetime DESC;");
  } catch (err) {
    res.status(500).send(err.message)
    console.log("DATABASE ERROR: " + err.message);
  }
  
  res.status(200).send(result.rows)
}

module.exports = { serverStatus, playRoulette, gameHistory };
