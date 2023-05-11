import React, { useContext, useEffect, useState } from "react";
import { Box, IconButton, List, TextField, Typography } from "@mui/material/";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Style from "../components/Style";

import { getAll, postObjToApi } from "../modules/apiManager";
import UserContext from "../UserContext";

export default function StylesPage() {
  const [styles, setStyles] = useState([]);
  const [newStyleName, setNewStyleName] = useState("");
  const [validNewStyle, setValidNewStyle] = useState(true);

  const { userProfile } = useContext(UserContext);

  useEffect(() => {
    getAll("style").then(setStyles);
  }, []);

  useEffect(() => {
    const styleNames = styles.map((style) => style.name);
    if (styleNames.includes(newStyleName)) {
      setValidNewStyle(false);
    } else {
      setValidNewStyle(true);
    }
  }, [styles, newStyleName]);

  function NewStyleBox() {
    if (validNewStyle) {
      return (
        <>
          {newStyleName ? (
            <IconButton onClick={handleNewStyleSubmit}>
              <AddCircleIcon />
            </IconButton>
          ) : (
            <IconButton disabled>
              <AddCircleIcon />
            </IconButton>
          )}
          <TextField
            label="New Style"
            variant="standard"
            sx={{ ml: "0.2rem" }}
            onChange={(evt) => setNewStyleName(evt.target.value)}
          />
        </>
      );
    } else {
      return (
        <>
          <IconButton disabled>
            <AddCircleIcon color="error" />
          </IconButton>
          <TextField
            error
            helperText="This style already exists!"
            label="New Style"
            variant="standard"
            sx={{ ml: "0.2rem" }}
            onChange={(evt) => setNewStyleName(evt.target.value)}
          />
        </>
      );
    }
  }

  const handleNewStyleSubmit = () => {
    postObjToApi("style", { name: newStyleName }).then(() =>
      window.location.reload(true)
    );
  };
  return (
    <Box sx={{ m: "1rem", p: "1rem" }}>
      <Typography variant="h4">Styles</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          m: "0.5rem",
        }}
      >
        {/* TODO GO BACK AND FIX THIS NESTED TERNARY */}
        {userProfile &&
          (validNewStyle ? (
            <>
              {newStyleName ? (
                <IconButton onClick={handleNewStyleSubmit}>
                  <AddCircleIcon />
                </IconButton>
              ) : (
                <IconButton disabled>
                  <AddCircleIcon />
                </IconButton>
              )}
              <TextField
                label="New Style"
                variant="standard"
                sx={{ ml: "0.2rem" }}
                onChange={(evt) => setNewStyleName(evt.target.value)}
              />
            </>
          ) : (
            <>
              <IconButton disabled>
                <AddCircleIcon color="error" />
              </IconButton>
              <TextField
                error
                helperText="This style already exists!"
                label="New Style"
                variant="standard"
                sx={{ ml: "0.2rem" }}
                onChange={(evt) => setNewStyleName(evt.target.value)}
              />
            </>
          ))}
      </Box>
      <List>
        {styles.map((style) => (
          <Style key={`style--${style.id}`} style={style} />
        ))}
      </List>
    </Box>
  );
}
