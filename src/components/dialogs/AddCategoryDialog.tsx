import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormTextField from "../forms/FormTextField";

export default function CategoryDialog({ open, onClose, onSubmit }: any) {
  const schema = yup.object().shape({
    categoryCode: yup
      .string()
      .trim()
      .required("Category code is required")
      .min(1, "Category code must be between 1 and 5 characters")
      .max(5, "Category code must be between 1 and 5 characters")
      .matches(/^\S+$/, "Category code cannot be empty"),
    refCategoryName: yup
      .string()
      .required("Category Name is required")
      .matches(/^\S+$/, "Category name cannot be empty"),
    categoryDescription: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
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
      <DialogTitle>Add Category</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormTextField
            label="Category Code*"
            name="categoryCode"
            placeholder="Enter Category Code"
            fullWidth
            register={register}
            error={!!errors?.categoryCode}
            helperText={errors.categoryCode?.message}
            sx={{ mb: 2 }}
          />
          <FormTextField
            label="Category Name*"
            name="refCategoryName"
            placeholder="Enter Category Name"
            fullWidth
            register={register}
            error={!!errors?.refCategoryName}
            helperText={errors.refCategoryName?.message}
            sx={{ mb: 2 }}
          />
          <FormTextField
            label="Description*"
            name="categoryDescription"
            placeholder="Enter Description"
            multiline
            fullWidth
            register={register}
            error={!!errors?.categoryDescription}
            helperText={errors.categoryDescription?.message}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="info"
            sx={{
              mb: 2,
            }}
            onClick={() => reset()}
          >
            Clear
          </Button>
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
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
