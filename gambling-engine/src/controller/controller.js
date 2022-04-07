const serverStatus = (req, res) => {
  res.status(200).send({message: "Gambling engine running!"})
}

module.exports = {serverStatus}