import { useNavigate } from "react-router";

function Gambling() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Gambling Home</h1>
      <button onClick={handleClick} type="button">Go back</button>

      <h3>Play Roullete:</h3>
      <form>
        <label for="colour">Pick a colour (Red/Black/Green):</label>
        <input type="radio" id="red" name="colour"></input> 
        <input type="radio" id="black" name="colour"></input> 
        <input type="radio" id="green" name="colour"></input> <br/>
        <label for="bet">Bet amount:</label>
        <input type="text" id="bet" name="bet"></input>
      </form>
    </div>
  );
}

export default Gambling;
