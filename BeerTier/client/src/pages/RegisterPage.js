import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Link, TextField } from "@mui/material";

import { register } from "../modules/authManager";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();
    const userProfile = {
      firstName,
      lastName,
      email,
      displayName,
    };
    // TODO add error handling for bad email input here?
    register(userProfile, password).then(() => navigate("/"));
  };

  return (
    <Box
      sx={{
        mx: "auto",
        my: "2rem",
        textAlign: "center",
        maxWidth: "500px",
        flexShrink: 2,
      }}
    >
      <form onSubmit={registerSubmit}>
        <fieldset>
          <div>
            <h2>Register</h2>
          </div>
          <Box sx={{ my: "1rem" }}>
            <Link href="/login" underline="hover">
              <em>Already a user? Login here!</em>
            </Link>
          </Box>
          <div>
            <TextField
              required
              label="First name"
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ mb: "1rem" }}
            />
          </div>
          <div>
            <TextField
              required
              label="Last name"
              onChange={(e) => setLastName(e.target.value)}
              sx={{ mb: "1rem" }}
            />
          </div>
          <div>
            <TextField
              required
              label="Display name"
              onChange={(e) => setDisplayName(e.target.value)}
              sx={{ mb: "1rem" }}
            />
          </div>
          <div>
            <TextField
              required
              type="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: "1rem" }}
            />
          </div>
          <div>
            <TextField
              required
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: "1rem" }}
            />
          </div>
          <div>
            <TextField
              required
              type="password"
              label="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: "1rem" }}
              onSubmit={registerSubmit}
            />
          </div>
          {confirmPassword && confirmPassword !== password && (
            <div>
              <span>Passwords do not match!</span>
            </div>
          )}
          <div>
            <Button variant="contained" type="submit" onClick={registerSubmit}>
              Submit
            </Button>
          </div>
        </fieldset>
      </form>
    </Box>
  );
}
