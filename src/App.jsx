import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { database, getUsers, listenAuth, listenUsers, login, saveUserName } from "./firebase";

function App() {
  const [userName, setUserName] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(()=> {
    listenUsers(setUsersList);
    listenAuth(setUser);
  }, []);


  return (
    <>
      <h1>Firebase demo</h1>
      {user && <p>Welcome, {user.displayName}</p>}
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
      <button onClick={()=> login()}>login</button>
    </>
  );
}

export default App;
