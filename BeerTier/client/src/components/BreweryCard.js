import { useContext } from "react";

import UserContext from "../UserContext";
import { deleteBrewery } from "../modules/apiManager";

import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";

export default function BreweryCard({ breweryObj }) {
  const { userProfile } = useContext(UserContext);

  return (
    <Card className="brewery__card" sx={{ maxWidth: "25%" }}>
      <CardActionArea href={`/brewery/${breweryObj.id}`}>
        <CardContent>
          <Typography variant="h4" className="brewery__card__header">
            {breweryObj.name}
          </Typography>
          <Typography variant="body2" className="brewery__card__address">
            {breweryObj.address}
          </Typography>
          {userProfile?.isAdmin && (
            <>
              <EditButton controller="brewery" objRef={breweryObj} />
              <DeleteButton
                objRef={breweryObj}
                deleteCallback={deleteBrewery}
              />
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
