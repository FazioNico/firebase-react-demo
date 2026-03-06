import { useEffect, useState } from "react";
import "./App.css";
import { database, getUsers, listenAuth, listenUsers, login, logout, saveUserName } from "./firebase";

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
      {!user && <button onClick={()=> login()}>login</button>}
      {user && <button onClick={()=> logout()}>logout</button>}
    </>
  );
}

export default App;
