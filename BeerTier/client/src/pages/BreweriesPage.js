import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getAll } from "../modules/apiManager";
import BreweryCard from "../components/BreweryCard";

export default function BreweriesPage() {
  const navigate = useNavigate();
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    getAll("brewery").then(setBreweries);
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {breweries.map((breweryObj) => (
          <BreweryCard
            key={`brewery--${breweryObj.id}`}
            breweryObj={breweryObj}
          />
        ))}
      </Box>
      <Fab onClick={() => navigate("/brewery/new")} sx={{ m: 1 }}>
        <AddIcon />
      </Fab>
    </>
  );
}
