import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function BreweryCard({ breweryObj }) {
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
