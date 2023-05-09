import { useContext } from "react";
import UserContext from "../UserContext";

import { Box, Divider, ListItem, ListItemText } from "@mui/material";
import { DeleteIconButton } from "./DeleteButton";
import { EditIconButton } from "./EditButton";
import { deleteStyle } from "../modules/apiManager";

export default function Style({ style }) {
  const { userProfile } = useContext(UserContext);

  return (
    <Box sx={{ maxWidth: "300px" }}>
      <ListItem>
        <ListItemText primary={style.name} />
        {userProfile?.isAdmin && (
          <>
            <EditIconButton />
            <DeleteIconButton deleteCallback={deleteStyle} objRef={style} />
          </>
        )}
      </ListItem>
      <Divider />
    </Box>
  );
}
