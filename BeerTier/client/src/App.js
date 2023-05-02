import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

import logo from "./logo.svg";
import "./App.css";
import AppBar from "./AppBar";
import ApplicationViews from "./views/ApplicationViews";
import { onLoginStatusChange, me } from "./modules/authManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Router>
      <AppBar userProfile={userProfile} />
      <ApplicationViews />
    </Router>
  );
}

export default App;
