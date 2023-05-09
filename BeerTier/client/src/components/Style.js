import { Box, Divider, ListItem, ListItemText } from "@mui/material";

import { DeleteIconButton } from "./DeleteButton";
import { EditIconButton } from "./EditButton";

export default function Style({ style }) {
  return (
    <Box sx={{ maxWidth: "200px" }}>
      <ListItem>
        <ListItemText primary={style.name} />
        <EditIconButton />
        <DeleteIconButton />
      </ListItem>
      <Divider />
    </Box>
  );
}
