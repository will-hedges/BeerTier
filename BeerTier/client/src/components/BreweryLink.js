import { Link } from "@mui/material";

export default function BreweryLink({ brewery }) {
  return (
    <Link variant="h6" href={`/brewery/${brewery.id}`} underline="hover">
      {brewery.name}
    </Link>
  );
}
