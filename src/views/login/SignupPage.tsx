import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import FormTextField from "../../components/forms/FormTextField";
import CheckIcon from "@mui/icons-material/Check";
import axios from "../../api/apiConfig";
import { toast } from "react-toastify";
import SignUpImage from "../../assets/images/signup-image-blur.jpg";
import yupPassword from "yup-password";

export default function SignupPage() {
  const navigate = useNavigate();
  yupPassword(yup);

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Please enter a valid Email Address")
      .required("Email is required"),
    contactNo: yup
      .string()
      .matches(/^((0\d{9})|(\+\d{11}))$/, "Please enter a valid Contact No")
      .required("Contact Number is required"),
    address: yup.string().required("Address is required"),
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: any) => {
    if (data.password) {
      // Encode the 'password' using Base64
      data.password = btoa(data.password);
    }
    // Exclude confirmPassword from the submitted data
    const { confirmPassword, ...formDataWithoutConfirmPassword } = data;
    // Add the 'role' attribute to the form data
    const formData = { ...formDataWithoutConfirmPassword, role: "1" };
    console.log(formData);
    axios
      .post("/users/", formData)
      .then((response) => {
        console.log(response);
        if (response.data.description) {
          toast.success(response.data.description);
        }
      })
      .then(() => navigate("/"))
      .catch((error) => {
        console.log(error);
        if (error.response.data.description) {
          toast.error(error.response.data.description);
        }
      });
  };

  const backgroundStyles = {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "rgba(255, 255, 255)",
    borderRadius: "8px",
  };

  return (
    <Grid
      container
      sx={{
        overflow: "hidden",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${SignUpImage})`,
        backgroundSize: "cover",
        backgroundColor: "#ddd",
      }}
    >
      <Grid item xs={12} md={6}></Grid>
      <Grid item xs={12} md={8}>
        <Container maxWidth="lg" sx={{ ...backgroundStyles }} id="signUpCard">
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "600",
              color: "#000",
              mt: { xs: 5, md: 1 },
              textAlign: "center",
            }}
          >
            Sign Up
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#777",
              mb: 4,
              textAlign: "center",
            }}
          >
            Let's set up your Account
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
            <Typography variant="body1" sx={{ mt: -2, color: "gray" }}>
              Passwords must:
              <List sx={{ paddingLeft: 2, pt: 0 }}>
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    alignSelf: "center",
                    color: "#DA9002",
                    border: "1px solid #DA9002",
                    backgroundColor: "#FFF",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#f4f4f4",
                    },
                  }}
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    alignSelf: "center",
                    backgroundColor: "#F3A103",
                    "&:hover": {
                      backgroundColor: "#DA9002",
                    },
                  }}
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>

            <Typography
              variant="body1"
              color="#71797E"
              sx={{
                mt: 2,
                mb: 3,
                textAlign: "center",
              }}
            >
              Already have an account?
              <Link
                href="/"
                sx={{
                  textDecoration: "none",
                  fontWeight: 500,
                  pl: "3px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </form>
        </Container>
      </Grid>
    </Grid>
  );
}
