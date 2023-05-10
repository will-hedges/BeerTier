import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Fab } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import BeerCard from "../components/BeerCard";
import { getAll } from "../modules/apiManager";

export default function BeersPage() {
  const navigate = useNavigate();
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    getAll("beer").then(setBeers);
  }, []);

  return (
    <>
      <Fab onClick={() => navigate("/beer/new")} sx={{ m: 1 }}>
        <AddIcon />
      </Fab>
      <Box
        key="beer__list"
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {beers.map((beerObj) => (
          <BeerCard beerObj={beerObj} key={`beer--${beerObj.id}`} />
        ))}
      </Box>
    </>
  );
}
