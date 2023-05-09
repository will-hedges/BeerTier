import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { getAll } from "../modules/apiManager";
import BreweryCard from "../components/BreweryCard";

export default function BreweriesPage() {
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    getAll("brewery").then(setBreweries);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {breweries.map((breweryObj) => (
        <BreweryCard
          key={`brewery--${breweryObj.id}`}
          breweryObj={breweryObj}
        />
      ))}
    </Box>
  );
}
