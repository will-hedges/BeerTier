import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import BreweryLink from "./BreweryLink";
import StyleLink from "./StyleLink";
import UserProfileLink from "./UserProfileLink";

export default function Beer({ beer }) {
  return (
    <Card className="beer__card" sx={{ mx: "1rem", maxWidth: "500px" }}>
      <CardActionArea href={`beer/${beer.id}`}>
        <CardContent>
          <Typography variant="h4">{beer.name}</Typography>
          <BreweryLink brewery={beer.brewery} />
          <Box sx={{ display: "flex" }}>
            {beer.styles.map((style) => {
              return (
                <StyleLink
                  style={style}
                  key={`beer--${beer.id}-style--${style.name}`}
                />
              );
            })}
          </Box>
          <p>{beer.content.slice(0, 100)} ...</p>
          <Typography variant="subtitle2">
            posted by <UserProfileLink userProfile={beer.userProfile} /> on{" "}
            {beer.createDateTime}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
