import { Box } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#424549",
        minHeight: "100vh",
        padding: "50px 0px",
      }}
    >
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Box>
  );
}

export default App;