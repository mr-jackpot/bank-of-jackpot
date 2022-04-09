const serverStatus = (req, res) => {
  res.status(200).send({message: "Gambling engine running!"})
}

const playRoulette = async (req, res) => {
  wheel = (Math.random() * (36 - 0) + 0).toFixed(0)
  colour = calculateColour(wheel)

  if (req.body.colour == undefined) {
    res.send({message: "Error! Please choose a colour"})
    return
  }
  
  if (req.body.colour == colour) {
    res.send({number: wheel, colour: colour, result: "Congratulations!"})
    return
  }
  if (req.body.colour != colour) {
    res.send({number: wheel, colour: colour, result: "Sorry, you lose."})
    return
  } 
}

const calculateColour = (number) => {
  if (number == 0) {
    return "green"
  }
  else if (number % 2 == 0) {
    return "red"
  }
  else {
    return "black"
  }
}

module.exports = {serverStatus, playRoulette}