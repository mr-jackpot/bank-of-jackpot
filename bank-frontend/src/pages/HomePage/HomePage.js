import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
  const handleAccountClick = () => {
    navigate("/account");
  };

  const handleGamblingClick = () => {
    navigate("/play");
  };
  return (
    <div>
      <h1>Bank home page</h1>
      <button onClick={handleAccountClick} type="button">
        Account Overview
      </button>
      <button onClick={handleGamblingClick} type="button">
        Play Gambling
      </button>
    </div>
  );
}

export default HomePage;
