import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";

function Gambling() {
  const [selectColour, setSelectColour] = useState("");
  const [selectBetAmount, setSelectBetAmount] = useState(0);
  const [col, setCol] = useState("");
  const [num, setNum] = useState(-1);
  const [cash, setCash] = useState(-1);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3200/api/gambling/roulette", {
          player: "624211bf6bff41b4e09691f4",
          bet: selectBetAmount,
          colour: selectColour
      })
      .then((res) => {
        console.log(res.data);
        const { colour, number, winnings, message } = res.data;
        setCol(colour);
        setNum(number);
        setCash(winnings);
        setMsg(message);
      })
      .catch((err) => {
        console.log(err);
        setMsg(err.message);
      });
  }

  return (
    <div>
      <h1>Gambling Home</h1>
      <button onClick={handleClick} type="button">
        Go back
      </button>

      <h3>Play Roullete: </h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="red">
          Red:
          <input
            onChange={(e) => setSelectColour("red")}
            type="radio"
            id="red"
            name="colour"
            value={selectColour}
          />{" "}
          <br />
        </label>
        <label htmlFor="black">
          Black:
          <input
            onChange={(e) => setSelectColour("black")}
            type="radio"
            id="black"
            name="colour"
            value={selectColour}
          />{" "}
          <br />
        </label>
        <label htmlFor="green">
          Green:
          <input
            onChange={(e) => setSelectColour("green")}
            type="radio"
            id="green"
            name="colour"
            value={selectColour}
          />{" "}
          <br />
        </label>
        <label htmlFor="bet">
          Bet amount:
          <input
            onChange={(e) => setSelectBetAmount(e.target.value)}
            type="text"
            id="bet"
            name="bet"
            value={selectBetAmount}
          />{" "}
          <br />
        </label>
        <input type="submit" />
      </form>

      <br />

      <h3>Result: {msg}</h3>
      <p> Number: {num}</p>
      <p> Colour: {col}</p>
      <p> Winnings: {cash}</p>
    </div>
  );
}

export default Gambling;
