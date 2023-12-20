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
      <Typography variant="h6">Upload Document</Typography>
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
        <Typography variant="body2" sx={{ mb: "10px" }}>
          Click to upload your Document
        </Typography>
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
        {selectedFiles.length > 0 && (
          <Box sx={{ marginLeft: "15px", flex: 1 }}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              Selected Files:
            </Typography>
            {selectedFiles.map((file: any, index: any) => (
              <ListItem key={index} sx={{ p: 0, m: 0 }}>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddDocuments;
