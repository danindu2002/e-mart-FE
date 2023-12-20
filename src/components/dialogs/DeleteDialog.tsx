import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import WarningIcon from "@mui/icons-material/ReportProblemRounded";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
            }}
          >
            <WarningIcon sx={{ color: "#A00", fontSize: "110px" }} />
          </Box>
        </DialogTitle>
        <DialogContent sx={{ color: "#666", p: 1 }}>
          <DialogContentText
            id="alert-dialog-description"
            align="center"
            maxWidth={300}
            sx={{ color: "#222", p: 0 }}
          >
            This will be deleted permanently. You cannot undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="outlined"
            sx={{
              alignSelf: "center",
              color: "#A00",
              border: "1px solid #A00",
              "&:hover": { border: "1px solid #700" },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            variant="contained"
            sx={{
              backgroundColor: "#A00",
              "&:hover": { backgroundColor: "#700" },
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
