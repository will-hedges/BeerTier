import { Card, CardContent, Typography } from "@mui/material";

export default function Beer({ beer }) {
  return (
    <Card className="beer__card">
      <CardContent>
        <Typography variant="h4">{beer.name}</Typography>
        {beer.styles.map((style) => {
          return <div>#{style.name}</div>;
        })}
        <Typography variant="h5">
          {beer.brewery.name} ({beer.category.name})
        </Typography>
        <p>{beer.content}</p>
        <Typography variant="h6">
          posted by {beer.userProfile.displayName} on {beer.createDateTime}
        </Typography>
      </CardContent>
    </Card>
  );
}
