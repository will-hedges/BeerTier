import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import BreweryLink from "./BreweryLink";
import StyleLink from "./StyleLink";
import UserProfileLink from "./UserProfileLink";

export default function Beer({ beer, userProfile }) {
  const navigate = useNavigate();
  return (
    <Card className="beer__card" sx={{ mx: "1rem", maxWidth: "50%" }}>
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
          {
            // beer.content can be null, so only show it if it exists
            beer.content && (
              <p>
                {beer.content.slice(0, 100)}{" "}
                {beer.content.length > 100 && "..."}
              </p>
            )
          }
          <Typography variant="subtitle2">
            posted by <UserProfileLink userProfile={beer.userProfile} /> on{" "}
            {beer.createDateTime}
          </Typography>
          {(userProfile.id === beer.userProfile.id || userProfile.isAdmin) && (
            // stopPropagation and preventDefault are here to stop tacking on the Card href to the route
            // see https://stackoverflow.com/a/61594128/13615436 for more info
            <>
              <Button
                onMouseDown={(evt) => {
                  evt.stopPropagation();
                }}
                onClick={(evt) => {
                  evt.stopPropagation();
                  evt.preventDefault();
                  navigate(`/beer/edit/${beer.id}`);
                }}
              >
                Edit
              </Button>
              <Button>Delete</Button>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
