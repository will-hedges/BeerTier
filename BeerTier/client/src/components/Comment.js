import { Box, Typography } from "@mui/material";
import UserProfileLink from "./UserProfileLink";

export default function Comment({ comment }) {
  return (
    <Box sx={{ border: "1px solid" }}>
      <Box sx={{ bgcolor: "#145ea8", px: "0.5rem", py: "0.5rem" }}>
        <Typography variant="body2">
          {comment.createDateTime}{" "}
          <UserProfileLink userProfile={comment.userProfile} /> said
        </Typography>
      </Box>
      <Box sx={{ px: "0.5rem", py: "0.5rem" }}>
        <Typography variant="body2">{comment.content}</Typography>
      </Box>
    </Box>
  );
}
