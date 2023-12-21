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
import FormTextField from "../forms/FormTextField";
import { useEffect } from "react";

export default function CategoryDialog({
  open,
  onClose,
  onSubmit,
  category,
}: any) {
  const schema = yup.object().shape({
    categoryCode: yup.string().required("Category Code is required"),
    refCategoryName: yup.string().required("Category Name is required"),
    categoryDescription: yup.string().required("Description is required"),
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

  // const fetchCategoryData = async () => {
  //   try {
  //     const res = await axios.get(
  //       `/users/view-users/${parsedUserData?.userId}`
  //     );

  //     setUserData(res.data.object);
  //     console.log("userData:", userData);

  //     setValue("firstName", res.data.object.firstName);
  //     setValue("lastName", res.data.object.lastName);
  //     setValue("email", res.data.object.email);
  //     setValue("contactNo", res.data.object.contactNo);
  //     setValue("address", res.data.object.address);
  //     setFullName(`${res.data.object.firstName} ${res.data.object.lastName}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategoryData();
  // }, [setValue]);

  const handleCancel = () => {
    reset();
    onClose();
  };
  // console.log("selected category", category.categoryId);

  return (
    <Dialog open={open}>
      <DialogTitle>Update Category</DialogTitle>
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
