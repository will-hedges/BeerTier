import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";

import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteIconButton } from "./DeleteButton";
import { EditIconButton } from "./EditButton";
import { deleteStyle, putObjToApi } from "../modules/apiManager";

export default function Style({ style }) {
  const { userProfile } = useContext(UserContext);

  const [editingStyle, setEditingStyle] = useState(false);
  const [editedStyleName, setEditedStyleName] = useState("");

  useEffect(() => {
    setEditedStyleName(style.name);
  }, [style.name, editingStyle]);

  const handleEditedStyle = () => {
    const editedStyleObj = {
      id: style.id,
      name: editedStyleName,
    };
    putObjToApi("style", editedStyleObj).then(() =>
      window.location.reload(true)
    );
  };

  return (
    <Box sx={{ maxWidth: "300px" }}>
      <ListItem>
        {!editingStyle ? (
          <>
            <ListItemText primary={style.name} />
            {userProfile?.isAdmin && (
              <>
                <EditIconButton state={editingStyle} setter={setEditingStyle} />
                <DeleteIconButton deleteCallback={deleteStyle} objRef={style} />
              </>
            )}
          </>
        ) : (
          <>
            <TextField
              value={editedStyleName}
              onChange={(evt) => setEditedStyleName(evt.target.value)}
            />
            <IconButton onClick={handleEditedStyle}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={() => setEditingStyle(false)}>
              <CloseIcon />
            </IconButton>
          </>
        )}
      </ListItem>
      <Divider />
    </Box>
  );
}
