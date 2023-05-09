import React, { useEffect, useState } from "react";
import { Box, List, Typography } from "@mui/material/";

import Style from "../components/Style";

import { getAll } from "../modules/apiManager";

export default function StylesPage() {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    getAll("style").then(setStyles);
  }, []);

  return (
    <Box sx={{ m: "1rem", p: "1rem" }}>
      <Typography variant="h4">Styles</Typography>
      <List>
        {styles.map((style) => (
          <Style key={`style--${style.id}`} style={style} />
        ))}
      </List>
    </Box>
  );
}
