const mongoose = require('mongoose')
const Account = require('../models/account')
require('dotenv').config()

mongoose.connect(process.env.MONGO_CONN, { useNewUrlParser: true });

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

const closeAccount = (req, res) => {
    Account.findByIdAndDelete(req.params.id)
    .then(dbProduct => {
        res.send("Account successfully closed.")
    })
    .catch(err => {
        res.json(err)
    })
}

const updateAccountBalance = (req, res) => {
    Account.findByIdAndUpdate(req.params.id, 
      {$inc:{ 
        account_balance: req.body.account_balance  
      }}, {new: true}) // {new: true} - returns the UPDATED document. By deafult this mongoose function will return the original.
      .then( dbProduct => {
        if (dbProduct !== null)
            res.json(dbProduct)
        if (dbProduct === null)
            res.json(`record ID ${req.params.id} not found`)
      })
      .catch( err => {
        res.json(err)
      });
  }

module.exports = { getAllAccounts, getOneAccount, createNewAccount, closeAccount, updateAccountBalance };
