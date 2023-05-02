import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, TextField } from "@mui/material";
import { login } from "../modules/authManager";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Login Failed"));
  };

  return (
    <Box
      sx={{ mx: "auto", my: "2rem", textAlign: "center", maxWidth: "500px" }}
    >
      <form>
        <fieldset>
          <div>
            <h2>Login</h2>
          </div>
          <div>
            <TextField
              required
              label="Email"
              id="email__textfield"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              sx={{ my: "1rem" }}
              required
              type="password"
              label="Password"
              id="password__textfield"
              onChange={(e) => setPassword(e.target.value)}
              onSubmit={loginSubmit}
            />
          </div>
          <div>
            <Button variant="contained" type="submit" onClick={loginSubmit}>
              Submit
            </Button>
          </div>
        </fieldset>
      </form>
    </Box>
  );
}
