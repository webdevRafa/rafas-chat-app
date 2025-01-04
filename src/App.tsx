import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl">HELLO WORLD</h1>
      <p>my name is rafatanga</p>
      <button onClick={() => alert(import.meta.env.VITE_FIREBASE_API_KEY)}>
        CLICK ME
      </button>
    </>
  );
}

export default App;
