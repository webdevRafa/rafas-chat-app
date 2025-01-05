import "./App.css";
import { ChatRoom } from "./components/ChatRoom";
import { Login } from "./components/Login";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
import { User } from "firebase/auth"; // Import user type from Firebase

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Set the user if authenticated, otherwise null
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);
  return (
    <>
      <div>{user ? <ChatRoom /> : <Login />}</div>
    </>
  );
}

export default App;
