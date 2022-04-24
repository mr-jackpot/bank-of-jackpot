import axios from "axios";
import { useEffect, useState } from "react";

function BankStatement(props) {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = (customerId) => {
    axios.get(`localhost:3100/api/payments/${customerId}`).then((res) => {
      const transactionlist = [];
      const data = res.data;

      data.map((x) => {
        return transactionlist.push({
          sender: data.sender,
          reciever: data.reciever,
          amount: data.amount,
          date: data.date,
        });
      });
      console.log(transactionlist)
      return transactionlist
    });
  };

  useEffect(() => {
    setTransactions(loadTransactions(props.id));
  }, [props.id])

  const renderStatements = (data) => {
      var render = []
      data.map(x => {
          return render.push(
              <p1>
                {x.sender} <br/>
                {x.reciever} <br/>
                {x.amount} <br/>
                {x.date}
              </p1>
          )
      })
      return render;
  }


  return (
    <div>
        {renderStatements(transactions)}
    </div>
  );
}

export default BankStatement;
