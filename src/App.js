import React from "react";
import "./App.css";
import Editor from "./components/Editor/Editor";
import Background from "./components/Background/Background";
import Title from "./components/Title/Title";

function App() {
  return (
    <div className="App">
      <Title />
      <Editor />
      <Background />
    </div>
  );
}

export default App;
