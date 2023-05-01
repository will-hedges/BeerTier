import React, { useEffect, useState } from "react";
import Beer from "./Beer";
import { getAllBeers } from "../modules/beerManager";

export default function BeerList() {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    getAllBeers().then((beers) => setBeers(beers));
  }, []);

  return (
    <div>
      {beers.map((beer) => (
        <Beer beer={beer} key={beer.Id} activeLinks={true} />
      ))}
    </div>
  );
}
