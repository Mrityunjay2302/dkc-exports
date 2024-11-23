import { Box, Typography } from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SuspanceLoading = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <svg width={0} height={0}>
            <defs>
              <linearGradient
                id="my_gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#e01cd5" />
                <stop offset="100%" stopColor="#1CB5E0" />
              </linearGradient>
            </defs>
          </svg>
          <CircularProgress
            size={45}
            disableShrink
            thickness={4}
            sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
          />
          <Typography variant="h6" fontWeight={400} sx={{ fontSize: "1rem" }}>
            Loading...
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SuspanceLoading;
