import { Card, CardContent, Typography } from "@mui/material";

export default function Beer({ beer }) {
  return (
    <Card className="beer__card" key={`beer-${beer.id}`}>
      <CardContent>
        <Typography variant="h4">{beer.name}</Typography>
        {beer.styles.map((style) => {
          return (
            <div key={`beer-${beer.id}--style-${style.name}`}>
              #{style.name}
            </div>
          );
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
