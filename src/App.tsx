import "./App.css";

function App() {
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
