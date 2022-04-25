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
    </div>
  );
}

export default Gambling;
