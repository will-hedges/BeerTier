import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { display } from "@mui/system";

export default function RegisterPage() {
  // states for all login input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // a register sumbit callback
  const registerSubmit = (e) => {};

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
