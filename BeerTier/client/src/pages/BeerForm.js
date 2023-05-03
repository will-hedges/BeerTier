import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Link, TextField } from "@mui/material";

export default function NewBeerPage({ beer }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [breweryId, setBreweryId] = useState(0);
  const [styles, setStyles] = useState([]);
  const [content, setContent] = useState("");
  const [imageLocation, setImageLocation] = useState("");

  // TODO need a useEffect to fetch all breweries, styles

  // rather than having separate new + edit forms
  // load the selected beer on edit
  useEffect(() => {
    if (beer) {
      setName(beer.name);
      setBreweryId(beer.breweryId);
      setStyles(beer.styles);
      setContent(beer.content);
      setImageLocation(beer.imageLocation);
    }
  }, [beer]);

  // TODO
  const submitForm = (e) => {};

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
      <form onSubmit={submitForm}>
        <fieldset>
          <div>
            <h2>New Beer</h2>
          </div>
          <div>
            <TextField
              required
              label="Beer name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <TextField label="Brewery" select />
          </div>
          <div>placeholder for style selector(s)</div>
          <div>
            <TextField
              label="Content"
              placeholder="Did you like or dislike this beer? Would you recommend it to others?"
              multiline
              rows={5}
            />
          </div>
          <div>
            <TextField label="Image URL" placeholder="http://example.com" />
          </div>
        </fieldset>
      </form>
    </Box>
  );
}
