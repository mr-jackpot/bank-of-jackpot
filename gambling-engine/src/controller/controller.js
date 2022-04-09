const serverStatus = (req, res) => {
  res.status(200).send({ message: "Gambling engine running!" });
};

const playRoulette = async (req, res) => {
  wheel = (Math.random() * (36 - 0) + 0).toFixed(0);

  colour = calculateColour(wheel);

  if (req.body.colour == undefined) {
    res.send({ message: "Error! Please choose a colour" });
    return;
  }

  if (req.body.colour == colour) {
    res.send({
      number: wheel,
      colour: colour,
      winnings: calculateWinnings(req.body.bet, colour),
      message: "Congratulations! You won!",
    });
    return;
  }
  if (req.body.colour != colour) {
    res.send({
      number: wheel,
      colour: colour,
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
    return bet * 14;
  } else if (colour != "red" || colour != "black") {
    return bet * 2;
  }
};

module.exports = { serverStatus, playRoulette };
