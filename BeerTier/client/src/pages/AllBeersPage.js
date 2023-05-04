import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BeerCard from "../components/BeerCard";
import { getAll } from "../modules/resourceManager";

export default function AllBeersPage({ userProfile }) {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    getAll("beer").then((beers) => setBeers(beers));
  }, []);

  return (
    <Box
      key="beer__list"
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {beers.map((beer) => (
        <BeerCard
          beer={beer}
          key={`beer--${beer.id}`}
          userProfile={userProfile}
        />
      ))}
    </Box>
  );
}
