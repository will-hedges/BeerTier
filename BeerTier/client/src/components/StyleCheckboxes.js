import { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { getAll } from "../modules/resourceManager";

export default function StyleCheckboxes({
  checkedStyleIds,
  setCheckedStyleIds,
}) {
  const [styles, setStyles] = useState([]);

  const handleCheckboxChange = (e) => {
    const style = e.target;
    const styleId = parseInt(e.target.value);
    const copy = [...checkedStyleIds];

    if (style.checked) {
      copy.push(styleId);
      setCheckedStyleIds(copy);
    } else {
      const filteredCopy = copy.filter((i) => i !== styleId);
      setCheckedStyleIds(filteredCopy);
    }
  };

  useEffect(() => {
    getAll("style").then((styleArray) => setStyles(styleArray));
  }, []);

  return (
    <Box sx={{ my: "1rem" }}>
      <FormLabel>Style(s): (at least 1 required)</FormLabel>
      {/* TODO this needs GRID badly, or should be in a Drawer */}
      <FormGroup>
        {styles.map((style) => (
          <FormControlLabel
            key={`style--${style.id}`}
            label={style.name}
            control={
              <Checkbox value={style.id} onChange={handleCheckboxChange} />
            }
          />
        ))}
      </FormGroup>
    </Box>
  );
}
