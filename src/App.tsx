import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import AppProvider from "./components/AppProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <Outlet />
        </AppProvider>
      </AuthProvider>
    </>
  );
}

export default App;
