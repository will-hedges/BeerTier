import { BrowserRouter as Router } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import ApplicationViews from "./views/ApplicationViews";

function App() {
  return (
    <Router>
      <ApplicationViews />
    </Router>
  );
}

export default App;
