import { useContext, useEffect, useState } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import UserProfileLink from "./UserProfileLink";
import { DeleteIconButton } from "./DeleteButton";
import { EditIconButton } from "./EditButton";

import { deleteComment, putObjToApi } from "../modules/apiManager";
import UserContext from "../UserContext";

export default function Comment({ comment }) {
  const { userProfile } = useContext(UserContext);

  const [editingComment, setEditingComment] = useState(false);
  const [editedCommentContent, setEditedCommentContent] = useState("");

  useEffect(() => {
    setEditedCommentContent(comment.content);
  }, [comment.content, editingComment]);

  const handleEditedComment = () => {
    const editedCommentObj = {
      id: comment.id,
      beerId: comment.beerId,
      content: editedCommentContent,
      userProfileId: comment.userProfile.id,
      createDateTime: comment.createDateTime,
    };

    putObjToApi("comment", editedCommentObj, comment.id).then(() =>
      window.location.reload(true)
    );
  };

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
        {(userProfile?.id === comment.userProfile.id ||
          userProfile?.isAdmin) && (
          <Box>
            <EditIconButton state={editingComment} setter={setEditingComment} />
            <DeleteIconButton deleteCallback={deleteComment} objRef={comment} />
          </Box>
        )}
      </Box>
      <Box sx={{ px: "0.5rem", py: "0.5rem" }}>
        {!editingComment ? (
          <Typography variant="body2">{comment.content}</Typography>
        ) : (
          <>
            <TextField
              fullWidth
              multiline
              value={editedCommentContent}
              onChange={(evt) => setEditedCommentContent(evt.target.value)}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={handleEditedComment}>Submit</Button>
              <Button onClick={() => setEditingComment(false)}>Cancel</Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
