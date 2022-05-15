import { useNavigate } from "react-router";
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate();
  const handleAccountClick = () => {
    navigate("/account");
  };

  const handleGamblingClick = () => {
    navigate("/play");
  };
  return (
    <div className="homePage">
      <p className="welcomeMessage">JACKPOT BANK</p>
      <div className="buttonContainer">
        <button className="selectorButton" onClick={handleAccountClick} type="button">
          Account Overview
        </button>
        <button className="selectorButton" onClick={handleGamblingClick} type="button">
          Play Gambling
        </button>
      </div>
    </div>
  );
}

export default HomePage;
