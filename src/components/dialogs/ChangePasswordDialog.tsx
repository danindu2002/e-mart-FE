import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import yupPassword from "yup-password";

yupPassword(yup);

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .minLowercase(1, "Password must contain at least 1 lower case letter")
    .minUppercase(1, "Password must contain at least 1 upper case letter")
    .minNumbers(1, "Password must contain at least 1 number")
    .minSymbols(1, "Password must contain at least 1 special character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ChangePasswordDialog = ({ open, onClose, onSubmit }: any) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ pb: 0 }}>Change Password</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            type="password"
            label="New Password"
            size="small"
            {...register("password")}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            type="password"
            label="New Confirm Password"
            size="small"
            fullWidth
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Typography variant="body1" sx={{ mt: 1.5, color: "gray" }}>
            Passwords must:
            <List sx={{ paddingLeft: 2 }}>
              <ListItem sx={{ p: 0 }}>
                <CheckIcon />
                Be a minimum of 8 characters
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <CheckIcon />
                Include at least one uppercase letter (A-Z)
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <CheckIcon />
                Include at least one lowercase letter (a-z)
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <CheckIcon />
                Include at least one number (0-9)
              </ListItem>
            </List>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="info"
            sx={{
              mb: 2,
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="info"
            sx={{
              alignSelf: "center",
              mb: 2,
              mr: "15px",
              color: "#fff",
            }}
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePasswordDialog;
