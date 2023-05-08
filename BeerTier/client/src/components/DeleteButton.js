import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";

export function DeleteButton({ deleteCallback, objRef }) {
  return (
    // stopPropagation and preventDefault are here to stop tacking on the Card href to the route
    // otherwise you end up with like 'beer/beer/edit/22'
    // see https://stackoverflow.com/a/61594128/13615436 for more info
    <Button
      onMouseDown={(evt) => evt.stopPropagation()}
      onClick={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        deleteCallback(objRef);
      }}
    >
      Delete
    </Button>
  );
}

export function DeleteIconButton({ deleteCallback, objRef }) {
  return (
    // stopPropagation and preventDefault are here to stop tacking on the Card href to the route
    // otherwise you end up with like 'beer/beer/edit/22'
    // see https://stackoverflow.com/a/61594128/13615436 for more info
    <IconButton
      size="small"
      onMouseDown={(evt) => evt.stopPropagation()}
      onClick={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        deleteCallback(objRef);
      }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}
