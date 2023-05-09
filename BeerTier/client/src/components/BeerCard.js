import { useContext } from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import BreweryLink from "./BreweryLink";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import StyleLink from "./StyleLink";
import UserProfileLink from "./UserProfileLink";

import { deleteBeer } from "../modules/apiManager";
import UserContext from "../UserContext";

export default function BeerCard({ beerObj }) {
  const { userProfile } = useContext(UserContext);

  return (
    <Card className="beer__card" sx={{ mx: "1rem", maxWidth: "50%" }}>
      <CardActionArea href={`/beer/${beerObj.id}`}>
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
            posted by <UserProfileLink userProfile={beerObj?.userProfile} /> on{" "}
            {beerObj.createDateTime}
          </Typography>
          {(userProfile?.id === beerObj?.userProfile.id ||
            userProfile?.isAdmin) && (
            <>
              <EditButton controller="beer" objRef={beerObj} />
              <DeleteButton objRef={beerObj} deleteCallback={deleteBeer} />
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
