import React from "react";
import "./App.css";
import Editor from "./components/Editor/Editor";
import Background from "./components/Background/Background";
import Title from "./components/Title/Title";
import Footer from "./components/Footer/Footer";
import GoogleAnalytics from "./components/Analytics/Analytics";

class App extends React.Component {
  state = {};
  inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  componentDidMount() {
    const inIframe = this.inIframe();
    this.setState({ inIframe });
  }

  render() {
    const { inIframe } = this.state;
    return (
      <div className="App">
        {!inIframe && <GoogleAnalytics />}
        {!inIframe && <Title />}
        <Editor />
        <Background />
        {!inIframe && <Footer />}
      </div>
    );
  }
}

export default App;
