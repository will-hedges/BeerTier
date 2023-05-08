import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BeerCard from "../components/BeerCard";
import { getAll } from "../modules/resourceManager";
import UserContext from "../UserContext";

export default function AllBeersPage() {
  const [beers, setBeers] = useState([]);

  const { userProfile } = useContext(UserContext);

  useEffect(() => {
    getAll("beer").then((beers) => setBeers(beers));
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
