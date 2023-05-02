import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Box, Link, Typography } from "@mui/material";

import { getBeerById } from "../modules/beerManager";

export default function BeerDetailsPage() {
  const [beer, setBeer] = useState(null);

  let { id } = useParams();
  id = parseInt(id);

  useEffect(() => {
    getBeerById(id).then(setBeer);
  }, [id]);

  if (!beer) {
    return null;
  }

  return (
    <Box sx={{ px: "2rem", py: "2rem" }}>
      {beer.styles.map((style) => (
        <>
          <Link underline="hover" sx={{ mr: "1rem" }}>
            #{style.name}
          </Link>
        </>
      ))}
      <Typography variant="h3">{beer.name}</Typography>
      <Box></Box>
      <Link href={`/brewery/${beer.brewery.id}`} variant="h4" underline="hover">
        {beer.brewery.name}
      </Link>
      <Typography variant="subtitle1">
        posted by{" "}
        <Link href={`/userProfile/${beer.userProfile.id}`} underline="hover">
          {beer.userProfile.displayName}
        </Link>{" "}
        on {beer.createDateTime}
      </Typography>
      <Typography variant="body1">{beer.content}</Typography>
      <Box>
        <Typography variant="h5">Comments</Typography>
        <Box>
          {beer.comments.map((comment) => (
            <Typography variant="body2">
              {comment.userProfile.displayName} said "{comment.content}" on{" "}
              {comment.createDateTime}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
