import React from "react";
import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const AddDocuments = ({ handleFileChange, selectedFiles }: any) => {
  return (
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
        Upload Document
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
            startIcon={<NoteAddIcon />}
            sx={{ marginBottom: "15px" }}
          >
            Add Documents
            <input
              id="file-input"
              type="file"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
          </Button>
        </label>
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          Click to upload your Document
        </Typography>
      </Box>
    </Box>
  );
};

export default AddDocuments;
