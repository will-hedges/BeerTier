import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { getById } from "../modules/apiManager";
import { Box, Typography } from "@mui/material";

export default function BreweryDetailsPage() {
  const [brewery, setBrewery] = useState(null);
  let { id } = useParams();
  id = parseInt(id);

  useEffect(() => {
    getById("brewery", id).then(setBrewery);
  }, [id]);

  return (
    <Box sx={{ px: "2rem", py: "2rem" }}>
      <Typography variant="h3">{brewery.name}</Typography>
      <Typography variant="subtitle1">{brewery.address}</Typography>
    </Box>
  );
}
