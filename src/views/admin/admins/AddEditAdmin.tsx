import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "../../../api/apiConfig";
import yupPassword from "yup-password";
import FormTextField from "../../../components/forms/FormTextField";

export default function AddEditEvent() {
  let editUser = false;
  let navigate = useNavigate();
  const { userId } = useParams();
  editUser = Boolean(userId);
  yupPassword(yup);

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("First Name is required")
      .matches(/\S/, "First Name cannot be empty"),
    lastName: yup
      .string()
      .required("Last Name is required")
      .matches(/\S/, "Last Name cannot be empty"),
    email: yup
      .string()
      .email("Please enter a valid Email Address")
      .required("Email is required"),
    contactNo: yup
      .string()
      .matches(/^((0\d{9})|(\+\d{11}))$/, "Please enter a valid Contact No")
      .required("Contact Number is required"),
    address: yup
      .string()
      .required("Address is required")
      .matches(/\S/, "Address cannot be empty"),
    password: editUser
      ? yup.string()
      : yup
          .string()
          .min(8, "Password must be at least 8 characters")
          .max(20, "Password cannot exceed 20 characters")
          .minLowercase(1, "Password must contain at least 1 lower case letter")
          .minUppercase(1, "Password must contain at least 1 upper case letter")
          .minNumbers(1, "Password must contain at least 1 number")
          .minSymbols(1, "Password must contain at least 1 special character")
          .required("Password is required"),
    confirmPassword: editUser
      ? yup.string()
      : yup
          .string()
          .oneOf([yup.ref("password")], "Passwords do not match")
          .required("Confirm Password is required"),
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

  useEffect(() => {
    if (editUser) {
      axios
        .get(`/users/view-users/${userId}`)
        .then((res) => {
          console.log("user:", res.data);
          setValue("firstName", res.data.object.firstName);
          setValue("lastName", res.data.object.lastName);
          setValue("email", res.data.object.email);
          setValue("contactNo", res.data.object.contactNo);
          setValue("address", res.data.object.address);
          setValue("password", res.data.object.password);
          setValue("confirmPassword", res.data.object.confirmPassword);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [editUser, userId]);

  const submitHandler = (data: any) => {
    if (data.password) {
      // Encode the 'password' using Base64
      data.password = btoa(data.password);
    }
    console.log("Submit Data", data);

    if (editUser) {
      // Update Admin
      const formData = { ...data, role: "2" };
      console.log(formData);
      axios
        .put(`/users/${userId}/false`, formData)
        .then((response) => {
          console.log(response);
          toast.success(response.data.description);
          navigate("/admin/admins");
          reset();
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            error.response.data.description ??
              "An error occurred while updating admin"
          );
        });
    } else {
      // Add Admin
      const { confirmPassword, ...formDataWithoutConfirmPassword } = data;
      const formData = { ...formDataWithoutConfirmPassword, role: "2" };
      axios
        .post("/users/", formData)
        .then((response) => {
          console.log(response);
          if (response.data.description) {
            toast.success(response.data.description);
            reset();
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.description) {
            toast.error(
              error.response.data.description ??
                "An error occurred while adding new admin"
            );
          }
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
            {editUser ? "Edit Admin" : "Add Admin"}
          </Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormTextField
                  label="First Name*"
                  name="firstName"
                  placeholder="Enter First Name"
                  fullWidth
                  register={register}
                  error={!!errors?.firstName}
                  helperText={errors.firstName?.message}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormTextField
                  label="Last Name*"
                  name="lastName"
                  placeholder="Enter Last Name"
                  fullWidth
                  register={register}
                  error={!!errors?.lastName}
                  helperText={errors.lastName?.message}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormTextField
                  label="Email*"
                  name="email"
                  placeholder="Enter Email"
                  fullWidth
                  register={register}
                  error={!!errors?.email}
                  helperText={errors.email?.message}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormTextField
                  label="Contact No*"
                  name="contactNo"
                  placeholder="Enter Contact No"
                  fullWidth
                  register={register}
                  error={!!errors?.contactNo}
                  helperText={errors.contactNo?.message}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <FormTextField
                  label="Address*"
                  name="address"
                  placeholder="Enter Address"
                  fullWidth
                  register={register}
                  error={!!errors?.address}
                  helperText={errors.address?.message}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
            {!editUser && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormTextField
                    type="password"
                    label="Password*"
                    name="password"
                    placeholder="Enter Password"
                    fullWidth
                    register={register}
                    error={!!errors?.password}
                    helperText={errors.password?.message}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormTextField
                    type="password"
                    label="Confirm Password*"
                    name="confirmPassword"
                    placeholder="Enter Confirm Password"
                    fullWidth
                    register={register}
                    error={!!errors?.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>
            )}
            {!editUser && (
              <Typography variant="body1" sx={{ color: "gray" }}>
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
            )}
            <Grid container spacing={2}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  sx={{ alignSelf: "center", mt: 2, mr: "8px", color: "#fff" }}
                  startIcon={editUser ? <EditIcon /> : <AddIcon />}
                >
                  {editUser ? "Save Admin" : "Add Admin"}
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
