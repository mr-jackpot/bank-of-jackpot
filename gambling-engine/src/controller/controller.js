require('dotenv').config()
const axios = require("axios").default;
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.SQL_DB_USER,
  host: process.env.SQL_DB_HOST,
  database: process.env.ROULETTE_DB_NAME,
  password: process.env.SQL_DB_PASSWD,
  port: process.env.SQL_DB_PORT,
});

const serverStatus = (req, res) => {
  res.status(200).send({ message: "Gambling engine running!" });
};

const getPlayerProfile = async (req, res) => {
  const player = req.params.id
  var result = '';
  try {
    result = await pool.query(
      `SELECT * FROM players WHERE account_id='${player}'`
    );
  } catch (err) {
    res.status(500).send(err.message)
    console.log("DATABASE ERROR: " + err);
  }

  res.status(200).send(result.rows)
}

const playRoulette = async (req, res) => {
  const { player, bet, colour } = req.body;
  var wheelColour;
  isRegistered = await isPlayerRegistered(player);
  if (isRegistered == "not found") {
    await playerSignUp(player);
  }
  await axios.post("http://payment-engine:3100/api/payments", {
    sender: player,
    reciever: "6251bf9e9dc38baf9247c084",
    amount: bet,
  });
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
    money = calculateWinnings(bet, wheelColour);
    await axios.post("http://localhost:3100/api/payments", {
      sender: "6251bf9e9dc38baf9247c084",
      reciever: player,
      amount: money,
    });
    res.send({
      number: wheel,
      colour: wheelColour,
      winnings: money,
      message: "Congratulations! You won!",
    });
    await updatePlayerStats(player, true, money)
    return;
  }
  if (colour != wheelColour) {
    res.send({
      number: wheel,
      colour: wheelColour,
      winnings: 0,
      message: "Sorry! You lost!",
    });
    await updatePlayerStats(player, false, bet)
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
  result = "";
  try {
    result = await pool.query("SELECT * FROM results ORDER BY datetime DESC;");
  } catch (err) {
    res.status(500).send(err.message);
    console.log("DATABASE ERROR: " + err.message);
  }

  res.status(200).send(result.rows);
};

const updatePlayerStats = async (playerId, didWin, winnings) => {
  if (didWin) {
    try {
      await pool.query(
        `UPDATE players 
        SET games = games + 1,
            won = won + 1,
            winnings = winnings + ${winnings}
        WHERE account_id = '${playerId}'`
      );
    } catch (err) {
      console.log("DATABASE ERROR: " + err.message);
      return "error";
    }
  } else {
    try {
      await pool.query(
        `UPDATE players 
        SET games = games + 1,
            lost = lost + 1,
            winnings = winnings - ${winnings}
        WHERE account_id = '${playerId}'`
      );
    } catch (err) {
      console.log("DATABASE ERROR: " + err.message);
      return "error";
    }
  }
};

const isPlayerRegistered = async (playerId) => {
  var result = "";
  try {
    result = await pool.query(
      `SELECT account_id FROM players WHERE account_id='${playerId}'`
    );
  } catch (err) {
    console.log("DATABASE ERROR: " + err.message);
    return "error";
  }
  if (result.rows.length === 0) {
    console.log("Player not found.");
    return "not found";
  } else {
    console.log("Player found.");
    return "found";
  }
};

const playerSignUp = async (playerId) => {
  var result = "";
  console.log("fire");
  try {
    result = await pool.query(
      "INSERT INTO players (account_id, games, won, lost, winnings) values ($1, 0, 0, 0, 0);",
      [playerId]
    );
  } catch (err) {
    console.log("DATABASE ERROR: " + err.message);
  }
};

module.exports = { serverStatus, playRoulette, gameHistory, getPlayerProfile };
