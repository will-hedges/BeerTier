import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";

import UserContext from "../UserContext";
import { deleteBrewery, getById } from "../modules/apiManager";

import { Box, Typography } from "@mui/material";
import { EditButton } from "../components/EditButton";
import { DeleteButton } from "../components/DeleteButton";

export default function BreweryDetailsPage() {
  const [brewery, setBrewery] = useState(null);
  const { userProfile } = useContext(UserContext);
  let { id } = useParams();
  id = parseInt(id);

  useEffect(() => {
    getById("brewery", id).then(setBrewery);
  }, [id]);

  return (
    <Box sx={{ px: "2rem", py: "2rem" }}>
      <Typography variant="h3">{brewery?.name}</Typography>
      <Typography variant="subtitle1">{brewery?.address}</Typography>
      {userProfile?.isAdmin && (
        <>
          <EditButton controller="brewery" objRef={brewery} />
          <DeleteButton deleteCallback={deleteBrewery} objRef={brewery} />
        </>
      )}
    </Box>
  );
}
