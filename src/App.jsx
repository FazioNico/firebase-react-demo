import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { database, getUsers, listenUsers, saveUserName } from "./firebase";

function App() {
  const [userName, setUserName] = useState("");
  const [usersList, setUsersList] = useState([]);
  console.log(database);

  useEffect(()=> {
    listenUsers(setUsersList);
  }, []);

  return (
    <>
      <h1>Firebase demo</h1>
      <ul>
        {usersList.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={() => saveUserName(userName)}>
        Save user name
      </button>
    </>
  );
}

export default App;
