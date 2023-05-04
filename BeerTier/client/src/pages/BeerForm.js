import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Link, TextField } from "@mui/material";

import { getToken } from "../modules/authManager";
import { postToApi } from "../modules/resourceManager";

import BreweryDropdown from "../components/BreweryDropdown";
import StyleCheckboxes from "../components/StyleCheckboxes";

export default function NewBeerPage({ beer }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  // breweryId will be an integer but setting to 0 will not render the label correctly
  const [breweryId, setBreweryId] = useState("");
  const [checkedStyleIds, setCheckedStyleIds] = useState([]);
  const [content, setContent] = useState("");
  const [imageLocation, setImageLocation] = useState("");

  // rather than having separate new + edit forms
  // load the selected beer on edit
  useEffect(() => {
    if (beer) {
      setName(beer.name);
      setBreweryId(beer.breweryId);
      // beer.styles is a List<Style>, so we need to get all the StyleIds for the state
      const styleIdArray = [];
      for (const style in beer.styles) {
        styleIdArray.push(style.id);
      }
      setCheckedStyleIds();
      setContent(beer.content);
      setImageLocation(beer.imageLocation);
    }
  }, [beer]);

  // TODO set up useEffects for each state that needs validation
  //  can use the 'error' prop

  const submitForm = (e) => {
    e.preventDefault();
    const beerObj = {
      name,
      breweryId,
      content,
      imageLocation,
    };

    // if it's new beer, send a POST
    if (!beerObj.id) {
      postToApi("beer", beerObj).then((newBeerObj) => {
        // use Promise.all() for all the beerStyles
        return getToken().then((token) => {
          const promises = [];
          for (const styleId of checkedStyleIds) {
            const beerStyleObj = {
              beerId: newBeerObj.id,
              styleId: styleId,
            };
            promises.push(
              fetch("/api/beerStyle", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(beerStyleObj),
              })
            );
          }
          Promise.all(promises).then(navigate(`/beer/${newBeerObj.id}`));
        });
      });
    } else {
      // if it's not new (i.e. edited) send a PUT
    }
  };

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
              sx={{ my: "1rem" }}
            />
          </div>
          <div>
            <BreweryDropdown
              breweryId={breweryId}
              setBreweryId={setBreweryId}
            />
          </div>
          <div>
            <StyleCheckboxes
              checkedStyleIds={checkedStyleIds}
              setCheckedStyleIds={setCheckedStyleIds}
            />
          </div>
          <div>
            <TextField
              label="Content"
              placeholder="Did you like or dislike this beer? Would you recommend it to others?"
              multiline
              rows={5}
              sx={{ my: "1rem" }}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Image URL"
              placeholder="http://example.com"
              sx={{ my: "1rem" }}
              onChange={(e) => setImageLocation(e.target.value)}
            />
          </div>
          <div>
            {/* TODO RESTRICT THE BUTTON FOR REQUIRED INPUTS */}
            {name && breweryId && checkedStyleIds.length > 0 ? (
              <Button variant="contained" type="submit" onClick={submitForm}>
                Submit
              </Button>
            ) : (
              <Button disabled>Submit</Button>
            )}
          </div>
        </fieldset>
      </form>
    </Box>
  );
}
