import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import WarningIcon from "@mui/icons-material/WarningRounded";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

/**
 * Delete Confirmation Dialog Box
 * *props used to customize the Delete Confirmation Dialog Box
 * @open - Flag indicating whether the dialog is open or closed.
 * @handleClose - Callback function to close the dialog.
 * @handleDelete - Callback function to execute the delete action.
 */

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

function DeleteDialog({ open, handleClose, handleDelete }: DeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ borderRadius: "10px", p: 1 }}>
        <DialogTitle
          id="alert-dialog-title"
          align="center"
          sx={{ color: "#000", fontWeight: "bold", p: 1, fontSize: "25px" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <ErrorOutlineOutlinedIcon
              sx={{ color: "#dd3333", fontSize: "60px" }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Warning!
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ color: "#666", p: 2 }}>
          <DialogContentText
            id="alert-dialog-description"
            align="center"
            maxWidth={300}
            sx={{ color: "#222", p: 0 }}
          >
            This will be deleted permanently. You cannot undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pt: 0 }}>
          <Button
            type="button"
            sx={{
              alignSelf: "center",
              color: "#4c4c4c",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            // variant="contained"
            sx={{
              // backgroundColor: "#dd3333",
              color: "#dd3333",
              "&:hover": { color: "#A00" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default DeleteDialog;
