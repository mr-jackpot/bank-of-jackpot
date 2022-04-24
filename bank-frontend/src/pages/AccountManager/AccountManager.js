import { useState, useEffect } from "react";
import axios from "axios";

function AccountManager() {
    
    const [balance, setBalance] = useState(0)
    const [accountId, setAccountId] = useState("Loading...")
    const [name, setName] = useState("Loading...")
    const [dob, setDob] = useState(new Date())
    const [address, setAddress] = useState("Loading...")


    useEffect(() => {
      axios.get('http://localhost:3300/api/accounts/624211bf6bff41b4e09691f4')
      .then(res => {
        setBalance(res.data.account_balance)
        setAccountId(res.data._id)
        setName(res.data.name)
        setDob(new Date(res.data.date_of_birth))
        setAddress(res.data.address)
      })
    })

    return (
    <div>
      <div>
          <h3>Account Details</h3>
          <p>Account ID: {accountId}</p>
          <p>Account Balance: {balance}</p>

          <h3>Customer Details</h3>
          <p>Name: {name}</p>
          <p>Date Of Birth: {dob.toLocaleDateString("en-GB")}</p>
          <p>Address: {address}</p>
      </div>
    </div>
    );
  }
  
  export default AccountManager;