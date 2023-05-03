import { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { getAll } from "../modules/resourceManager";

export default function StyleCheckboxes({ checkedStyles, setCheckedStyles }) {
  const [styles, setStyles] = useState([]);

  const handleCheckboxChange = (e) => {
    const style = e.target;
    const styleId = parseInt(e.target.value);
    const copy = [...checkedStyles];

    if (style.checked) {
      copy.push(styleId);
      setCheckedStyles(copy);
    } else {
      const filteredCopy = copy.filter((i) => i !== styleId);
      setCheckedStyles(filteredCopy);
    }
  };

  useEffect(() => {
    getAll("style").then((styleArray) => setStyles(styleArray));
  }, []);

  return (
    <Box sx={{ my: "1rem" }}>
      <FormLabel>Style(s):</FormLabel>
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
