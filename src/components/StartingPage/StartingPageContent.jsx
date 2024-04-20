import { useNavigate } from 'react-router-dom';
import './StartingPageContent.css';



const StartingPageContent = () => {

  const navigate = useNavigate();
  const completeProfile = () => {
    navigate("./profile");
  }
  return (
    <section>
      <h2 id={"headOne"}>Welcome to Expense Tracker.</h2>
      <h2 id={"headTwo"}>
        Your profile is incomplete.
        <button onClick={completeProfile}>Complete now</button>
      </h2>
      <hr />
    </section>
  );
};

export default StartingPageContent;
