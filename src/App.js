import './App.css';
import HanabriHead from "./musicPage/HanabriHead";
import HanabriBody from "./musicPage/HanabriBody";
import React from "react";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HanabriHead></HanabriHead>
        <HanabriBody></HanabriBody>
      </header>
    </div>
  );
}

export default App;
