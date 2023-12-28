import React from "react";
import {
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import FormTextField from "../../../components/forms/FormTextField";
import { Controller, useForm } from "react-hook-form";

const AddProductDetails = ({
  register,
  errors,
  control,
  handleSubmit,
  categories,
}: any) => (
  <div style={{ marginTop: 30 }}>
    <form onSubmit={handleSubmit}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={4}>
          <FormTextField
            type="number"
            label="Price (Rs.)*"
            name="price"
            placeholder="Enter Price (Rs.)"
            fullWidth
            register={register}
            // startAdornment="Rs."
            error={!!errors?.price}
            helperText={errors.price?.message}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
          <FormTextField
            type="number"
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
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormTextField
            type="number"
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
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small" error={!!errors?.category}>
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
                    {categories.map((category: any) => (
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
    </form>
  </div>
);

export default AddProductDetails;
