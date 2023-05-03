import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Link, TextField } from "@mui/material";

import BreweryDropdown from "../components/BreweryDropdown";

export default function NewBeerPage({ beer }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  // breweryId will be an integer but setting to 0 will not render the label correctly
  const [breweryId, setBreweryId] = useState(null);
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
        mx: "5rem",
        my: "2rem",
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
              margin="normal"
            />
          </div>
          <div>
            <BreweryDropdown
              breweryId={breweryId}
              setBreweryId={setBreweryId}
            />
          </div>
          <div>placeholder for style selector(s)</div>
          <div>
            <TextField
              label="Content"
              placeholder="Did you like or dislike this beer? Would you recommend it to others?"
              multiline
              rows={5}
              margin="normal"
            />
          </div>
          <div>
            <TextField
              label="Image URL"
              margin="normal"
              placeholder="http://example.com"
            />
          </div>
          <div>
            <Button variant="contained" type="submit" onClick={submitForm}>
              Submit
            </Button>
          </div>
        </fieldset>
      </form>
    </Box>
  );
}
