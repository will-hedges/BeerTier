import { BrowserRouter as Router } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import AppBar from "./AppBar";
import ApplicationViews from "./views/ApplicationViews";

function App() {
  return (
    <Router>
      <AppBar />
      <ApplicationViews />
    </Router>
  );
}

export default App;
