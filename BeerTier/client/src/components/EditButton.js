import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

export default function EditButton({ controller, objRef }) {
  const navigate = useNavigate();
  // stopPropagation and preventDefault are here to stop tacking on the Card href to the route
  // otherwise you end up with like 'beer/beer/edit/22'
  // see https://stackoverflow.com/a/61594128/13615436 for more info
  return (
    <Button
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
