import Button from "@mui/material/Button";

export default function DeleteButton({ deleteObjId, deleteHandler }) {
  return (
    // stopPropagation and preventDefault are here to stop tacking on the Card href to the route
    // otherwise you end up with like 'beer/beer/edit/22'
    // see https://stackoverflow.com/a/61594128/13615436 for more info
    <Button
      onMouseDown={(evt) => evt.stopPropagation()}
      onClick={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        deleteHandler(deleteObjId);
      }}
    >
      Delete
    </Button>
  );
}
