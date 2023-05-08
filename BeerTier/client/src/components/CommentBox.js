import { Box, Button, TextField, Typography } from "@mui/material";

import { postObjToApi } from "../modules/resourceManager";

export default function CommentBox({
  beerId,
  commentContent,
  setCommentContent,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}>
      <Typography variant="h6" sx={{ m: "0.5rem" }}>
        Leave a Comment
      </Typography>
      <TextField
        label="Write your thoughts here"
        multiline
        rows={5}
        onChange={(evt) => setCommentContent(evt.target.value)}
      />
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
    </Box>
  );
}
