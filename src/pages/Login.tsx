import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { FC } from "react";
import { AlertNotify } from "../components/Alert";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const Login: FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("email") || !data.get("password"))
      return alert("Email or password is empty");
    const request = await axios.post(
      "http://localhost:4001/qltv/api/v1/login",
      {
        email: data.get("email"),
        password: data.get("password"),
      }
    );

    if (request.data.type === "success") {
      if (!!request.data.user) {
        sessionStorage.setItem("user", JSON.stringify(request.data));
      }
      navigate("/dashboard");
    }
    AlertNotify({
      message: request.data.message,
      type: request.data.type,
    });
  };
  return (
    <Stack alignItems="center" justifyContent="center" height="100vh">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "400px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};
