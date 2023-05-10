import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getById, postObjToApi, putObjToApi } from "../modules/apiManager";

import { Button, Stack, TextField, Typography } from "@mui/material";

export default function BreweryForm() {
  const navigate = useNavigate();

  let { breweryId } = useParams();
  breweryId = parseInt(breweryId);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [imageLocation, setImageLocation] = useState("");

  useEffect(() => {
    if (breweryId) {
      getById("brewery", breweryId).then((brewery) => {
        setName(brewery.name);
        setAddress(brewery.address);
        brewery.imageLocation && setImageLocation(brewery.imageLocation);
      });
    }
  }, [breweryId]);

  const handleFormSubmit = () => {
    const breweryObj = {
      name,
      address,
      imageLocation,
    };
    if (breweryId) {
      // if it's an edit, send a PUT
      breweryObj.id = breweryId;
      putObjToApi("brewery", breweryObj).then(() =>
        navigate(`/brewery/${breweryId}`)
      );
    } else {
      // if it's new, send a POST
      postObjToApi("brewery", breweryObj).then((newBreweryObj) =>
        navigate(`/brewery/${newBreweryObj.id}`)
      );
    }
  };

  function SubmitButton() {
    return name && address ? (
      <Button
        onClick={handleFormSubmit}
        variant="outlined"
        sx={{ mx: "auto", width: "150px", alignSelf: "center" }}
      >
        Submit
      </Button>
    ) : (
      <Button
        disabled
        variant="outlined"
        sx={{ mx: "auto", width: "150px", alignSelf: "center" }}
      >
        Submit
      </Button>
    );
  }

  return (
    <Stack spacing={2} sx={{ m: "2rem", maxWidth: "500px" }}>
      <Typography variant="h4">
        {breweryId ? "Edit Brewery" : "New Brewery"}
      </Typography>
      <TextField
        required
        label="Brewery Name"
        placeholder="Acme Brewing Co."
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
      <TextField
        required
        label="Brewery Address"
        placeholder="123 State St, Anytown, USA 12345"
        value={address}
        onChange={(evt) => setAddress(evt.target.value)}
      />
      <TextField
        label="Image Url"
        placeholder="http://example.com/brewery_image"
        value={imageLocation}
        onChange={(evt) => setImageLocation(evt.target.value)}
      />
      <SubmitButton />
    </Stack>
  );
}
