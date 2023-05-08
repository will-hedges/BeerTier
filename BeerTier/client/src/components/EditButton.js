import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";

export function EditButton({ controller, objRef }) {
  const navigate = useNavigate();
  // stopPropagation and preventDefault are here to stop tacking on the Card href to the route
  // otherwise you end up with like 'beer/beer/edit/22'
  // see https://stackoverflow.com/a/61594128/13615436 for more info
  return (
    <Button
      sx={{ mx: "0.5rem" }}
      onMouseDown={(evt) => {
        evt.stopPropagation();
      }}
      onClick={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        navigate(`/${controller}/edit/${objRef.id}`);
      }}
    >
      Edit
    </Button>
  );
}

export function EditIconButton({ controller, objRef }) {
  const navigate = useNavigate();
  // stopPropagation and preventDefault are here to stop tacking on the Card href to the route
  // otherwise you end up with like 'beer/beer/edit/22'
  // see https://stackoverflow.com/a/61594128/13615436 for more info
  return (
    <IconButton
      size="small"
      sx={{ mx: "0.25rem" }}
      onMouseDown={(evt) => {
        evt.stopPropagation();
      }}
      onClick={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        navigate(`/${controller}/edit/${objRef.id}`);
      }}
    >
      <EditIcon fontSize="small" />
    </IconButton>
  );
}
