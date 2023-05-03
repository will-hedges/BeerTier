import { Link } from "@mui/material";

export default function StyleLink({ style }) {
  return (
    <Link
      href={`/style/${style.id}`}
      variant="subtitle2"
      underline="hover"
      sx={{ mr: "1rem" }}
    >
      #{style.name}
    </Link>
  );
}
