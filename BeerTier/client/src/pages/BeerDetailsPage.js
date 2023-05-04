import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Box, Typography } from "@mui/material";

import BreweryLink from "../components/BreweryLink";
import Comment from "../components/Comment";
import StyleLink from "../components/StyleLink";
import UserProfileLink from "../components/UserProfileLink";

import { getById } from "../modules/resourceManager";

export default function BeerDetailsPage() {
  const [beer, setBeer] = useState(null);

  let { id } = useParams();
  id = parseInt(id);

  useEffect(() => {
    getById("beer", id).then(setBeer);
  }, [id]);

  if (!beer) {
    return null;
  }

  return (
    <Box sx={{ px: "2rem", py: "2rem" }}>
      {beer.styles.map((style) => (
        <StyleLink key={`beer-${beer.id}--style-${style.id}`} style={style} />
      ))}
      <Typography variant="h3">{beer.name}</Typography>
      <BreweryLink brewery={beer.brewery} />
      <Typography variant="subtitle1">
        posted by <UserProfileLink userProfile={beer.userProfile} /> on{" "}
        {beer.createDateTime}
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "750px", my: "1rem" }}>
        {beer.content}
      </Typography>
      <Box sx={{ maxWidth: "500px" }}>
        <Typography variant="h5">Comments</Typography>
        <Box>
          {beer.comments.map((comment) => (
            <Comment key={`comment--${comment.id}`} comment={comment} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
