import React from "react";
import { Box, Button, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const AddProductPhotos = ({ handleFileChange }: any) => (
  <Box
    sx={{
      backgroundColor: "#f0f0f0",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      mt: 2,
    }}
  >
    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
      Upload Product Images
    </Typography>
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <label htmlFor="file-input">
        <Button
          color="primary"
          variant="contained"
          component="label"
          startIcon={<AddAPhotoIcon />}
          sx={{ marginBottom: "15px" }}
        >
          Add Product Images
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
        </Button>
      </label>
      <Typography variant="body2" sx={{ marginTop: "10px" }}>
        Click to upload your Product Images
      </Typography>
    </Box>
  </Box>
);

export default AddProductPhotos;
