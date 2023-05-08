import { useContext } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import { postObjToApi } from "../modules/resourceManager";
import UserContext from "../UserContext";

export default function CommentBox({
  beerId,
  commentContent,
  setCommentContent,
}) {
  const { userProfile } = useContext(UserContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}>
      <Typography variant="h6" sx={{ m: "0.5rem" }}>
        Leave a Comment
      </Typography>
      {userProfile ? (
        <>
          <TextField
            label="Write your thoughts here"
            multiline
            rows={5}
            onChange={(evt) => setCommentContent(evt.target.value)}
          />
          {commentContent ? (
            <Button
              variant="outlined"
              sx={{ width: "100px", m: "1rem" }}
              onClick={() => {
                postObjToApi("comment", {
                  beerId: beerId,
                  content: commentContent,
                }).then(() => window.location.reload(true));
              }}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="outlined"
              disabled
              sx={{ width: "100px", m: "1rem" }}
            >
              Submit
            </Button>
          )}
        </>
      ) : (
        <Typography variant="body2">
          You must be logged in to comment
        </Typography>
      )}
    </Box>
  );
}
