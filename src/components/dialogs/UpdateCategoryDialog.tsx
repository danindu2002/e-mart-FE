import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ClearIcon from "@mui/icons-material/Clear";
import FormTextField from "../forms/FormTextField";
import { useEffect } from "react";
import axios from "../../api/apiConfig";

export default function CategoryDialog({
  open,
  onClose,
  onSubmit,
  category,
}: any) {
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
      .matches(/^\S+$/, "Category code cannot be empty"),
    categoryDescription: yup
      .string()
      .required("Description is required")
      .matches(/^\S+$/, "Category code cannot be empty"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchCategoryData = async () => {
    console.log(category?.categoryId);
    try {
      const res = await axios.get(`/categories/${category?.categoryId}`);
      const categoryData = res.data.object;
      setValue("categoryCode", categoryData.categoryCode);
      setValue("refCategoryName", categoryData.refCategoryName);
      setValue("categoryDescription", categoryData.categoryDescription);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCategoryData();
    }
  }, [category]);

  console.log(category?.categoryId);

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Update Category</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormTextField
            label="Category Code"
            name="categoryCode"
            placeholder="Enter Category Code"
            fullWidth
            register={register}
            error={!!errors?.categoryCode}
            helperText={errors.categoryCode?.message}
            disabled
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
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
