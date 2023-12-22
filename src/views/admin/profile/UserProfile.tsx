import { yupResolver } from "@hookform/resolvers/yup";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import KeyIcon from "@mui/icons-material/Key";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "../../../api/apiConfig";
import ChangePasswordDialog from "../../../components/dialogs/ChangePasswordDialog";
import FormTextField from "../../../components/forms/FormTextField";
import { Context } from "../../../App";
import TopBar from "../../customer/TopBar";

export default function UserProfile() {
  const [fullName, setFullName] = useState("");
  const [userData, setUserData] = useState<any>({});
  const [editMode, setEditMode] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid Email Address")
      .required("Email is required"),
    contactNo: yup
      .string()
      .matches(/^[0-9]+$/, "Invalid Contact Number")
      .min(10, "Must be at least 10 digits")
      .required("Contact No is required"),
    address: yup.string().required("Address is required"),
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

  useLayoutEffect(() => {
    const storedUserData = sessionStorage.getItem("loggedUserData");
    console.log("storedUserData", storedUserData);
    const parsedUserData = JSON.parse(storedUserData as string);

    axios
      .get(`/users/view-users/${parsedUserData?.userId}`)
      .then((res) => {
        setUserData(res.data.object);
        console.log("userData:", userData);
        setValue("firstName", res.data.object.firstName);
        setValue("lastName", res.data.object.lastName);
        setValue("email", res.data.object.email);
        setValue("contactNo", res.data.object.contactNo);
        setValue("address", res.data.object.address);
        setFullName(`${res.data.object.firstName} ${res.data.object.lastName}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setValue]);

  const submitHandler = (data: any) => {
    console.log("Submit Data", data);
    const formData = { ...data, role: "1", profilePhoto: null };
    console.log(formData);
    axios
      .put(`/users/${userData?.userId}/false`, formData)
      .then((response) => {
        console.log(response);
        toast.success(response.data.description);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data.description);
      });
    setEditMode(false);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = (event!.target!.result as string).split(",");
        const uploadImage = base64Data[1];
        console.log(uploadImage.length);
        const { userId, role, ...userDataWithoutUserId } = userData;
        const updatedUser = {
          ...userDataWithoutUserId,
          role: 1,
          profilePhoto: uploadImage,
        };
        console.log("updatedUser", updatedUser);
        axios
          .put(`/users/${userData?.userId}/false`, updatedUser)
          .then((response) => {
            console.log("File uploaded successfully", response.data);
            toast.success(response.data.description);
          })
          .catch((error) => {
            console.error("Error uploading file", error);
          });
      };
      reader.readAsDataURL(file);
      window.location.reload();
    } else console.log("No file uploaded");
  };

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    formState: { errors: errors1 },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const passwordHandler = (submitData: any) => {
    if (submitData.password) {
      // Encode the 'password' using Base64
      submitData.password = btoa(submitData.password);
    }
    console.log("Submit Data", submitData);
    const { password } = submitData;
    const { userId, role, ...formDataWithoutId } = userData;
    const formData = { ...formDataWithoutId, role: "1", password };

    axios
      .put(`/users/${userData?.userId}/true`, formData)
      .then((response) => {
        console.log(response);
        toast.success(response.data.description);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data.description);
      });
    setOpenUpdate(false);
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
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <TopBar />
      <Container className="container">
        <Box
          maxWidth="md"
          className="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 10,
          }}
        >
          <Container maxWidth="lg" sx={{ ...backgroundStyles }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 1.5, color: "#444" }}
            >
              User Profile
            </Typography>
            <Grid container spacing={2} alignItems="center" marginBottom="25px">
              <Grid item>
                <Avatar
                  src={`data:image/png;base64,${userData.profilePhoto}`}
                  sx={{ width: 75, height: 75 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ p: 0 }}>
                  {fullName}
                </Typography>
                <Grid container spacing={1} alignItems="center">
                  <Grid item sx={{ padding: 0 }}>
                    <Button
                      component="label"
                      color="primary"
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "15px",
                        pt: 0,
                      }}
                      startIcon={<AddAPhotoIcon />}
                    >
                      Change Profile Photo
                      <Input type="file" onChange={handleFileChange} />
                    </Button>
                  </Grid>
                  <Grid item sx={{ padding: 0 }}>
                    <Button
                      type="button"
                      color="primary"
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "15px",
                        pt: 0,
                      }}
                      onClick={() =>
                        setEditMode((prevEditMode) => !prevEditMode)
                      }
                      startIcon={<EditIcon />}
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                  <Grid item sx={{ padding: 0 }}>
                    <Button
                      type="button"
                      color="primary"
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "15px",
                        pt: 0,
                      }}
                      onClick={() => setOpenUpdate(true)}
                      startIcon={<KeyIcon />}
                    >
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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
                    disabled={!editMode}
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
                    disabled={!editMode}
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
                    disabled={!editMode}
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
                    disabled={!editMode}
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
                    disabled={!editMode}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>
              {editMode && (
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
                      sx={{
                        alignSelf: "center",
                        mt: 2,
                        mr: "8px",
                        color: "#fff",
                      }}
                      startIcon={<EditIcon />}
                    >
                      Save
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
              )}
            </form>
          </Container>
        </Box>
        <ChangePasswordDialog
          open={openUpdate}
          onClose={() => {
            setOpenUpdate(false);
            reset1();
          }}
          handleSubmit={handleSubmit1}
          onSubmit={passwordHandler}
          reset={reset1}
          register={register1}
          errors={errors1}
        />
      </Container>
    </>
  );
}
