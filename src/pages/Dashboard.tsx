import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TableBook } from "../components/TableBook";
import Chart from "../components/Chart";

export const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <TableBook />
        </Paper>
      </Grid>
    </Grid>
  );
};
