import { useState, useEffect } from "react";
import axios from "axios";
import BankStatement from "../../components/BankStatement";
import { useNavigate } from "react-router";
import './AccountManager.css'

function AccountManager() {
    
    const [balance, setBalance] = useState(0)
    const [accountId, setAccountId] = useState("624211bf6bff41b4e09691f4")
    const [name, setName] = useState("Loading...")
    const [dob, setDob] = useState(new Date())
    const [address, setAddress] = useState("Loading...")

    var gbpFormatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
    })

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

    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/")
    }

    return (
    <div className="accountManager">
      <div className="headerContainer">
          <button className="backButton" onClick={handleClick} type="button"> BACK</button>
          <p className="title"> ACCOUNT MANAGER </p>
      </div>
      <div className="accountDetailsContainer"> 
        <p className="accountBalance">Balance: {gbpFormatter.format(balance)}</p>
        <p className="accountId">Account ID: {accountId}</p>
      </div>
      <BankStatement id={accountId} />
    </div>
    );
  }
  
  export default AccountManager;