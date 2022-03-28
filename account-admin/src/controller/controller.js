const mongoose = require('mongoose')
const Account = require('../models/account')

const db =
  "mongodb+srv://mongo:mongo@customer-database.swf3y.mongodb.net/customerdb?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true });

const getAllAccounts = (req, res) => {
    Account.find().sort({name: 'desc'})
    .then(dbProduct => {
        res.send(dbProduct)
    })
    .catch( err => {
      res.json(err)
    })
  }

const getOneAccount = (req, res) => {
    Account.findById(req.params.id)
    .then(dbProduct => {
        res.send(dbProduct)
    })
    .catch(err => {
        res.json(err)
    })
}

const createNewAccount = (req, res) => {
    console.log(req.body)
    Account.create(
    {
        name: req.body.name,
        date_of_birth: req.body.date_of_birth,
        address: req.body.address,
        account_balance: req.body.account_balance 
    }
  )
  .then( dbProduct => {
    res.json(dbProduct)
  })
  .catch( err => {
    res.json(err)
  });
}

module.exports = { getAllAccounts, getOneAccount, createNewAccount };
