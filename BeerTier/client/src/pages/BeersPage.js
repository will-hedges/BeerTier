import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BeerCard from "../components/BeerCard";
import { getAll } from "../modules/apiManager";

export default function BeersPage() {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    getAll("beer").then(setBeers);
  }, []);

  return (
    <Box
      key="beer__list"
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {beers.map((beerObj) => (
        <BeerCard beerObj={beerObj} key={`beer--${beerObj.id}`} />
      ))}
    </Box>
  );
}