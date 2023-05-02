import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Link,
  Typography,
} from "@mui/material";

export default function Beer({ beer }) {
  return (
    <Card
      className="beer__card"
      key={`beer-${beer.id}`}
      sx={{ mx: "1rem", maxWidth: "500px" }}
    >
      <CardActionArea href={`beer/${beer.id}`}>
        <CardContent>
          <Typography variant="h4">{beer.name}</Typography>
          {/* TODO THIS BREWERY LINK GOES NOWHERE RIGHT NOW */}
          <Link variant="h6" href="brewery" underline="hover">
            {beer.brewery.name}
          </Link>
          <Box sx={{ display: "flex" }}>
            {beer.styles.map((style) => {
              return (
                <Link
                  key={`beer-${beer.id}--style-${style.name}`}
                  // TODO NO STYLE LINKS YET
                  variant="subtitle2"
                  underline="hover"
                  sx={{ mr: "1rem" }}
                >
                  #{style.name}
                </Link>
              );
            })}
          </Box>
          <p>{beer.content.slice(0, 100)} ...</p>
          <Typography variant="subtitle2">
            posted by {/* TODO THIS USERPROFILE LINK GOES NOWHERE RIGHT NOW */}
            <Link href="userProfile" underline="hover">
              {beer.userProfile.displayName}
            </Link>{" "}
            on {beer.createDateTime}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
