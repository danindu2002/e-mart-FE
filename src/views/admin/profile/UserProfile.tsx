import { yupResolver } from "@hookform/resolvers/yup";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../../components/dialogs/DeleteDialog";

export default function UserProfile() {
  const [fullName, setFullName] = useState("");
  const [userData, setUserData] = useState<any>({});
  const [editMode, setEditMode] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { profilePhoto, setProfilePhoto } = useContext(Context);
  let navigate = useNavigate();

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

  const fetchUserData = async () => {
    try {
      const storedUserData = sessionStorage.getItem("loggedUserData");
      console.log("storedUserData", storedUserData);
      const parsedUserData = JSON.parse(storedUserData as string);
      const response = await axios.get(
        `/users/view-users/${parsedUserData?.userId}`
      );
      const userData = response.data.object;
      setUserData(userData);
      console.log("userData:", userData);
      setValue("firstName", userData.firstName);
      setValue("lastName", userData.lastName);
      setValue("email", userData.email);
      setValue("contactNo", userData.contactNo);
      setValue("address", userData.address);
      setFullName(`${userData.firstName} ${userData.lastName}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserData();
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
        toast.error(error.data.description ?? "An error occurred");
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
        setProfilePhoto(uploadImage);
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
            fetchUserData();
          })
          .catch((error) => {
            console.error("Error uploading file", error);
            toast.error(error.response.data.description ?? "An error occurred");
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
        toast.error(error.data.description ?? "An error occurred");
      });
    setOpenUpdate(false);
  };

  const handleDeleteClick = () => {
    console.log(userData.userId);
    setOpenDelete(true);
  };

  const handleDeleteDialog = () => {
    deleteUserAccount();
    setOpenDelete(false);
  };

  const deleteUserAccount = () => {
    console.log(userData.userId);
    axios
      .delete(`/users/${userData?.userId}`)
      .then((response) => {
        console.log(response);
        toast.success(response.data.description);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data.description ?? "An error occurred");
      });
  };

  const backgroundStyles = {
    display: "flex",
    mt: 4,
    p: 2,
    flexDirection: "column",
    backgroundColor: "#fff",
    boxShadow: "4px 4px 8px rgb(172, 177, 179)",
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
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  sx={{ p: 0, fontSize: "25px", fontWeight: "bold" }}
                >
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
                      <Input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                      />
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
                  <Grid item sx={{ padding: 0 }}>
                    <Button
                      type="button"
                      color="primary"
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "15px",
                        pt: 0,
                      }}
                      onClick={handleDeleteClick}
                      startIcon={<DeleteIcon />}
                    >
                      Delete Account
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
        <DeleteDialog
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          handleDelete={handleDeleteDialog}
        />
      </Container>
    </>
  );
}
