const axios = require('axios').default

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

module.exports = { serverStatus, playRoulette };
