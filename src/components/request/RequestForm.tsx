import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { useRequestContext } from "./RequestProvider";

const optionsData = [
  { label: "Mượn", value: "BORROW" },
  { label: "Trả", value: "RETURN" },
  { label: "Đền", value: "PAY" },
];

export const RequestForm = () => {
  const { requestForm, setRequestForm } = useRequestContext();
  const onChange = (event: React.SyntheticEvent, newValue: any) => {
    if (setRequestForm) {
      setRequestForm(newValue);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Phiếu yêu cầu
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            value={requestForm}
            onChange={onChange}
            disablePortal
            id="combo-box-demo"
            options={optionsData}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Loại" />}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
