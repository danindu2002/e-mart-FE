import { yupResolver } from "@hookform/resolvers/yup";
import KeyIcon from "@mui/icons-material/Key";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "../../api/apiConfig";
import logo from "../../assets/icons/EmartLogo.png";
import LoginBackgroundImage from "../../assets/images/background-image.jpg";
import { Context } from "../../App";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString();
  };

  const createCart = (userId: number) => {
    const data = {
      checkoutDate: getCurrentDate(),
    };

    axios
      .post(`/cart/${userId}`, data)
      .then((response) => {
        console.log(response.data);
        console.log("Cart created successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const loginHandler = async (data: any) => {
    try {
      let url = `/users/authenticate-users?email=${data.email}&password=${data.password}`;
      const response = await axios.post(url);
      console.log(response);

      const loggedUserData = { ...response.data.object, loggedIn: true };
      console.log("sessionStorage:", loggedUserData);
      sessionStorage.setItem("loggedUserData", JSON.stringify(loggedUserData));

      const matchedUser = response.data.object.role;
      if (matchedUser) {
        if (matchedUser === "User") {
          createCart(response.data.object?.userId);
          navigate("/user");
        } else if (matchedUser === "Admin") {
          navigate("/admin/");
        }
      } else {
        toast.error(response.data.description);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.description);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const backgroundStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: { xs: "75vh", md: "95vh" },
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "8px",
    zIndex: 1,
    position: { xs: "absolute", md: "static" },
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
  };

  return (
    <Grid
      container
      sx={{ overflow: "hidden", height: "100vh", backgroundColor: "#fff" }}
    >
      <Grid
        item
        xs={12}
        md={7}
        margin={0}
        padding={0}
        sx={{ backgroundColor: "gray" }}
      >
        <img
          src={LoginBackgroundImage}
          alt="Left Side Image"
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Container maxWidth="xs" sx={{ ...backgroundStyles }}>
          <img
            src={logo}
            alt="logo"
            width="100px"
            style={{ marginBottom: 10 }}
          />
          <Typography
            sx={{ fontSize: "30px", fontWeight: "600", color: "#000" }}
          >
            Welcome Back!
          </Typography>
          <Typography
            sx={{ fontSize: "18px", fontWeight: "500", color: "#777", mb: 4 }}
          >
            Sign in to your account
          </Typography>
          <form onSubmit={handleSubmit(loginHandler)}>
            <TextField
              label="Email"
              {...register("email")}
              placeholder="Enter Email Address"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
              error={errors?.email?.message?.toString() ? true : false}
              helperText={errors.email?.message}
              autoComplete="new-password"
              sx={{ mb: 4 }}
            />
            <TextField
              label="Password"
              {...register("password")}
              placeholder="Enter Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={errors?.password?.message?.toString() ? true : false}
              helperText={errors.password?.message}
              autoComplete="new-password"
            />
            <Grid item>
              <Link href="#" sx={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{
                    mt: "1px",
                    mb: 3,
                    textAlign: "right",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Typography>
              </Link>
            </Grid>
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
              Log In
            </Button>
            <Typography
              variant="body1"
              color="#71797E"
              sx={{
                mt: 3,
                mb: 3,
                textAlign: "center",
              }}
            >
              Don't have an account?
              <Link
                href="/signup"
                sx={{
                  textDecoration: "none",
                  fontWeight: 500,
                  pl: "3px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign up
              </Link>
            </Typography>
          </form>
        </Container>
      </Grid>
    </Grid>
  );
}
