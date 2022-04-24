import axios from "axios";
import { useEffect, useState } from "react";

function BankStatement(props) {
  const [statementData, setStatementData] = useState([]);

  var gbpFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  const loadTransactions = (customerId) => {
    axios
      .get(`http://localhost:3100/api/payments/${customerId}`)
      .then((res) => {
        let transactionlist = [];
        const data = res.data;

        data.map((x) => {
          transactionlist.push({
            sender: x.sender == customerId ? "Adam Heeps" : x.sender,
            reciever: x.reciever == customerId ? "Adam Heeps" : x.reciever,
            amount: gbpFormatter.format(x.amount),
            date: x.date,
          });
        });
        console.log(transactionlist);
        setStatementData(transactionlist);
        return transactionlist;
      });
  };

  const renderStatement = (data) => {
    var render = [];
    data.map((x) => {
      render.push(
        <div>
          <p>
            {x.sender} {x.reciever} {x.amount} {x.date}
          </p>
        </div>
      );
    });
    return render;
  };

  useEffect(() => {
    loadTransactions(props.id);
  }, []);

  return <div>{renderStatement(statementData)}</div>;
}

export default BankStatement;
