import { Link } from "@mui/material";

export default function UserProfileLink({ userProfile }) {
  return (
    <Link href={`/userProfile/${userProfile.id}`} underline="hover">
      {userProfile.displayName}
      {userProfile.isAdmin && " (admin)"}
    </Link>
  );
}
