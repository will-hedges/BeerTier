import { useContext } from "react";

import { Box, Typography } from "@mui/material";
import UserProfileLink from "./UserProfileLink";
import { DeleteIconButton } from "./DeleteButton";
import { EditIconButton } from "./EditButton";

import UserContext from "../UserContext";

export default function Comment({ comment }) {
  const { userProfile } = useContext(UserContext);

  return (
    <Box sx={{ border: "1px solid" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#145ea8",
          px: "0.5rem",
          py: "0.5rem",
        }}
      >
        <Typography variant="body2">
          {comment.createDateTime}{" "}
          <UserProfileLink userProfile={comment.userProfile} /> said
        </Typography>
        {(userProfile.id === comment.userProfile.id || userProfile.isAdmin) && (
          <Box>
            <EditIconButton />
            <DeleteIconButton />
          </Box>
        )}
      </Box>
      <Box sx={{ px: "0.5rem", py: "0.5rem" }}>
        <Typography variant="body2">{comment.content}</Typography>
      </Box>
    </Box>
  );
}
