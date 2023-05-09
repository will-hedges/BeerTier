import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getAll } from "../modules/apiManager";

export default function BreweryDropdown({ breweryId, setBreweryId }) {
  const [breweries, setBreweries] = useState([]);

  const handleChange = (e) => {
    setBreweryId(e.target.value);
  };

  useEffect(() => {
    getAll("brewery").then((breweryArray) => setBreweries(breweryArray));
  }, []);

  return (
    <FormControl sx={{ width: "350px", my: "1rem" }}>
      <InputLabel id="brewery__dropdown__label">Brewery name *</InputLabel>
      <Select
        labelId="brewery__dropdown__label"
        id="brewery__dropdown"
        value={breweryId}
        label="Brewery name *"
        onChange={handleChange}
      >
        {breweries.map((brewery) => (
          <MenuItem value={brewery.id} key={`brewery--${brewery.id}`}>
            {brewery.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
