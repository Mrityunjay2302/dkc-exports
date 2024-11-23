import { Box, Typography } from "@mui/material";
import React from "react";

const NotFoundPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h2">Page Not Found</Typography>
      </Box>
    </>
  );
};

export default NotFoundPage;
