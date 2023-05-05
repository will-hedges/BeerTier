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

import { deleteFromApi } from "../modules/resourceManager";

export default function BeerCard({ beerObj, userProfile }) {
  const navigate = useNavigate();

  const handleDeleteBeer = (beerId) => {
    // make sure we pass an object with the required properties
    const trimmedBeerObj = {
      id: beerId,
      name: beerObj.name,
      breweryId: beerObj.brewery.id,
      createDateTime: beerObj.createDateTime,
      userProfileId: beerObj.userProfile.id,
    };

    const confirmed = window.confirm(
      "Are you sure you want to delete this beer?"
    );
    if (confirmed) {
      deleteFromApi("beer", trimmedBeerObj, beerId).then(
        window.location.reload(true)
      );
    }
  };

  return (
    <Card className="beer__card" sx={{ mx: "1rem", maxWidth: "50%" }}>
      <CardActionArea href={`beer/${beerObj.id}`}>
        <CardContent>
          <Typography variant="h4">{beerObj.name}</Typography>
          <BreweryLink brewery={beerObj.brewery} />
          <Box sx={{ display: "flex" }}>
            {beerObj.styles.map((style) => {
              return (
                <StyleLink
                  style={style}
                  key={`beer--${beerObj.id}-style--${style.name}`}
                />
              );
            })}
          </Box>
          {
            // beer.content can be null, so only show it if it exists
            beerObj.content && (
              <p>
                {beerObj.content.slice(0, 100)}{" "}
                {beerObj.content.length > 100 && "..."}
              </p>
            )
          }
          <Typography variant="subtitle2">
            posted by <UserProfileLink userProfile={beerObj.userProfile} /> on{" "}
            {beerObj.createDateTime}
          </Typography>
          {(userProfile.id === beerObj.userProfile.id ||
            userProfile.isAdmin) && (
            // stopPropagation and preventDefault are here to stop tacking on the Card href to the route
            // otherwise you end up with like 'beer/beer/edit/22'
            // see https://stackoverflow.com/a/61594128/13615436 for more info
            <>
              <Button
                onMouseDown={(evt) => {
                  evt.stopPropagation();
                }}
                onClick={(evt) => {
                  evt.stopPropagation();
                  evt.preventDefault();
                  navigate(`/beer/edit/${beerObj.id}`);
                }}
              >
                Edit
              </Button>
              <Button
                onMouseDown={(evt) => evt.stopPropagation()}
                onClick={(evt) => {
                  evt.stopPropagation();
                  evt.preventDefault();
                  handleDeleteBeer(beerObj.id);
                }}
              >
                Delete
              </Button>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
