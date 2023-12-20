import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function ViewProduct() {
  return (
    <Container
      sx={{ p: 2, backgroundColor: "#fff", width: "100%", borderRadius: "5px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1.5, color: "#444" }}
        >
          Product Details
        </Typography>
      </Box>
    </Container>
  );
}
