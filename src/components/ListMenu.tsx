import { ListItemButton, ListItemIcon } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import React from "react";
import { useNavigate } from "react-router-dom";

export const ListItems = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Thư viện" />
      </ListItemButton>
      {user?.user?.role === "SUPER_ADMIN" ? (
        <ListItemButton onClick={() => navigate("/request-processing")}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Xử lí đơn" />
        </ListItemButton>
      ) : (
        <ListItemButton onClick={() => navigate("/request-form")}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Đơn yêu cầu" />
        </ListItemButton>
      )}
    </React.Fragment>
  );
};
