import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BeerCard from "./BeerCard";
import { getAllBeers } from "../modules/beerManager";

export default function BeerList() {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    getAllBeers().then((beers) => setBeers(beers));
  }, []);

  return (
    <Box
      key="beer__list"
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {beers.map((beer) => (
        <BeerCard beer={beer} key={beer.Id} activeLinks={true} />
      ))}
    </Box>
  );
}
