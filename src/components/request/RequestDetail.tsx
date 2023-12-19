import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ComboBoxMultiple } from "../ComboBoxMutiple";
import { useRequestContext } from "./RequestProvider";

const OptionMapping = {
  BORROW: "Mượn",
  RETURN: "Trả",
  PAY: "Đền",
};

export const RequestDetail = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const [dataBook, setDataBook] = useState<any[]>([]);
  const { title, setTitle } = useRequestContext();
  const fetchRequestDetail = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:4001/qltv/api/v1/book-getAll`,
      {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }
    );
    setDataBook(response.data.books);
  }, [user?.access_token]);

  useEffect(() => {
    fetchRequestDetail();
  }, [fetchRequestDetail]);

  const { selectRequest, handleSelectRequest, requests } = useRequestContext();
  const onChange = (event: React.SyntheticEvent, newValue: any) => {
    if (selectRequest) {
      handleSelectRequest?.(newValue);
    }
  };

  const handleConvertOption = () => {
    return (
      requests?.map((item) => {
        return {
          id: item.id,
          label: OptionMapping[item.type as keyof typeof OptionMapping],
          value: item.id,
        };
      }) || []
    );
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Phiếu yêu cầu
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            value={title}
            onChange={(e) => setTitle?.(e.target.value)}
            required
            id="title"
            name="title"
            label="Tên phiếu"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            value={selectRequest}
            onChange={onChange}
            disablePortal
            id="combo-box-demo"
            options={handleConvertOption()}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Loại" />}
          />
        </Grid>

        <Grid item xs={12}>
          <ComboBoxMultiple options={dataBook} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
