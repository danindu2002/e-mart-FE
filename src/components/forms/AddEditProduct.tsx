import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
  styled,
} from "@mui/material";
import { useContext, useLayoutEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "../../api/apiConfig";
import FormTextField from "./FormTextField";

export default function AddEditProduct() {
  const [categories, setCategories] = useState<any[]>([]);
  const [document, setDocument] = useState<any>(null);
  let editProduct = false;
  let navigate = useNavigate();
  const { productId } = useParams();
  editProduct = Boolean(productId);

  const schema = yup.object().shape({
    productName: yup.string().required("Product name is required"),
    productCode: yup.string().required("Product code is required"),
    description: yup.string().required("Description is required"),
    quantity: yup.string().required("Quantity is required"),
    rating: yup.string().required("Rating is required"),
    price: yup.string().required("Price is required"),
    size: yup.string(),
    color: yup.string(),
    category: yup.string().required("Category is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchCategories = () => {
    axios
      .get("/categories/")
      .then((response) => {
        console.log(response.data.responseList);
        setCategories(response.data.responseList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    if (editProduct) {
      axios
        .get(`/products/view-products/${productId}`)
        .then((res) => {
          console.log("user:", res.data);
          setValue("productName", res.data.object.productName);
          setValue("productCode", res.data.object.productCode);
          setValue("description", res.data.object.description);
          setValue("quantity", res.data.object.quantity);
          setValue("rating", res.data.object.rating);
          setValue("price", res.data.object.price);
          setValue("size", res.data.object.size);
          setValue("color", res.data.object.color);
          setValue("category", res.data.object.category);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchCategories();

    return () => {
      reset();
    };
  }, [editProduct, productId, reset, setValue]);

  // const handleFileChange = (event: any) => {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const base64Data = (event!.target!.result as string).split(",");
  //       const uploadDocument = base64Data[1];
  //       console.log(uploadDocument);
  //       setDocument(uploadDocument);
  //     };
  //     reader.readAsDataURL(file);
  //   } else console.log("No file uploaded");
  // };

  const submitHandler = (data: any) => {
    if (data.password) {
      // Encode the 'password' using Base64
      data.password = btoa(data.password);
    }
    console.log("Submit Data", data);

    if (editProduct) {
      // Update Product
      console.log(data);
      axios
        .put(`/products/${productId}`, data)
        .then((response) => {
          console.log(response);
          toast.success(response.data.description);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.description);
        });
      navigate("/admin/products");
    } else {
      // Add Product
      console.log(data);
      axios
        .post("/products/", data)
        .then((response) => {
          console.log(response);
          toast.success(response.data.description);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.description);
        });
    }
  };

  const backgroundStyles = {
    display: "flex",
    p: 2,
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255)",
    borderRadius: "8px",
    width: { lg: "82vw" },
  };

  const Input = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    width: 5,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
  });

  return (
    <div className="container">
      <Box
        maxWidth="md"
        className="form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="lg" sx={{ ...backgroundStyles }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 1.5, color: "#444" }}
          >
            {editProduct ? "Edit Product" : "Add Product"}
          </Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormTextField
                  label="Product Name*"
                  name="productName"
                  placeholder="Enter Product Name"
                  fullWidth
                  register={register}
                  error={!!errors?.productName}
                  helperText={errors.productName?.message}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormTextField
                  label="Product Code*"
                  name="productCode"
                  placeholder="Enter Product Code"
                  fullWidth
                  register={register}
                  error={!!errors?.productCode}
                  helperText={errors.productCode?.message}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormTextField
                  label="Price*"
                  name="price"
                  placeholder="Enter Price"
                  fullWidth
                  register={register}
                  error={!!errors?.price}
                  helperText={errors.price?.message}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <FormTextField
                  label="Description*"
                  name="description"
                  placeholder="Enter Product Description"
                  multiline
                  fullWidth
                  register={register}
                  error={!!errors?.description}
                  helperText={errors.description?.message}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormTextField
                  label="Color"
                  name="color"
                  placeholder="Enter Color"
                  fullWidth
                  register={register}
                  error={!!errors?.color}
                  helperText={errors.color?.message}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormTextField
                  label="Quantity*"
                  name="quantity"
                  placeholder="Enter Quantity"
                  fullWidth
                  register={register}
                  error={!!errors?.quantity}
                  helperText={errors.quantity?.message}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormTextField
                  label="Rating*"
                  name="rating"
                  placeholder="Enter Rating"
                  fullWidth
                  register={register}
                  error={!!errors?.rating}
                  helperText={errors.rating?.message}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel id="size-label">Size</InputLabel>
                  <Controller
                    name="size"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Size"
                        labelId="size-label"
                        size="small"
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="small">Small</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="large">Large</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="category-label">Category*</InputLabel>
                  <Controller
                    name="category"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          label="Category"
                          labelId="category-label"
                          size="small"
                        >
                          {categories.map((category) => (
                            <MenuItem
                              key={category.refCategoryId}
                              value={category.refCategoryId}
                            >
                              {category.refCategoryName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText sx={{ color: "red" }}>
                          {errors?.category?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  sx={{ alignSelf: "center", mt: 2, mr: "8px", color: "#fff" }}
                  startIcon={editProduct ? <EditIcon /> : <AddIcon />}
                >
                  {editProduct ? "Save Product" : "Add Product"}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="info"
                  sx={{
                    alignSelf: "center",
                    marginTop: 2,
                    border: "1px solid #EDA90E",
                  }}
                  onClick={() => reset()}
                  startIcon={<ClearIcon />}
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </form>
        </Container>
      </Box>
    </div>
  );
}
