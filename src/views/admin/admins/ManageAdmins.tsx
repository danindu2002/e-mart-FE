import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "../../../api/apiConfig";
import DataTable from "../../../components/tables/DataTable";
import FormTextField from "../../../components/forms/FormTextField";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/buttons/ActionButton";
import DeleteDialog from "../../../components/dialogs/DeleteDialog";
import { Context } from "../../../App";

export default function ManageAdmins() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<any | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const { userId } = useContext(Context);
  const navigate = useNavigate();

  const fetchUsers = () => {
    setOpenDrop(true);
    axios
      .get(`/users/view-user-roles/2/${userId}`)
      .then((response) => {
        console.log(response.data.responseList);
        setUsers(formatData(response.data.responseList));
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenDrop(false);
  };

  useEffect(() => {
    fetchUsers();
    console.log("Users: ", users);
  }, []);

  const formatData = (data: Array<any>) => {
    console.log("Users: ", data);
    return data?.map((data: any) => ({
      userId: data?.userId,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      contactNo: data?.contactNo,
      address: data?.address,
    }));
  };

  const handleChangePage = (user: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (user: any) => {
    setRowsPerPage(+user.target.value);
    setPage(0);
  };

  const { register, handleSubmit, reset } = useForm();

  const submitHandler = (data: any) => {
    console.log(data);
    fetchSearchedUser(data);
  };

  const fetchSearchedUser = (data: any) => {
    setOpenDrop(true);
    axios
      .get(`/users/search-users/${userId}?keyword=${data.name}&role=2`)
      .then((response) => setUsers(formatData(response.data.responseList)))
      .catch((error) => setUsers(formatData([])));
    setOpenDrop(false);
  };

  const handleDeleteClick = (admin: any) => {
    console.log(admin);
    setSelectedAdmin(admin);
    setOpenDelete(true);
  };

  const handleDeleteDialog = () => {
    deleteAdmin(selectedAdmin?.userId);
    setOpenDelete(false);
  };

  const deleteAdmin = async (userId: any) => {
    try {
      const response = await axios.delete(`/users/${userId}`);
      console.log(response);
      toast.success(response.data.description);
      fetchUsers();
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.description);
    }
  };

  const fieldStyle = {
    width: "100%",
    marginRight: "10px",
    marginBottom: "8px",
    "@media (min-width: 600px)": {
      width: "500px",
    },
  };

  const actionButtonBox = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };

  const searchButton = {
    p: "7px",
    mb: "15px",
    backgroundColor: "#EDA90E",
    "&:hover": { backgroundColor: "#CD9109" },
  };

  const tableHeaders = [
    "#",
    "First Name",
    "Last Name",
    "Email",
    "Contact No",
    "Address",
  ];

  const renderActions = (admin: any) => (
    <Box sx={{ ...actionButtonBox }}>
      <ActionButton
        title="Edit Details"
        to={`update-admin/${admin?.userId}`}
        icon={<EditIcon />}
      />
      <ActionButton
        title="Delete Admin"
        onClick={() => handleDeleteClick(admin)}
        icon={<DeleteIcon />}
      />
    </Box>
  );

  return (
    <>
      <Button
        type="button"
        variant="contained"
        color="success"
        sx={{
          alignSelf: "center",
          color: "#fff",
          mb: 1.5,
        }}
        onClick={() => navigate("/admin/admins/add-admin")}
        startIcon={<AddIcon />}
      >
        Add Admin
      </Button>
      <Container
        sx={{
          p: 2,
          backgroundColor: "#fff",
          width: "100%",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 1.5, color: "#444" }}
          >
            Manage Admins
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mb: "10px" }}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <FormTextField
              placeholder="Search by first name, last name, email, contact no or address"
              name="name"
              register={register}
              sx={{ ...fieldStyle }}
            />
            <Tooltip title="Search" arrow>
              <Button
                variant="contained"
                type="submit"
                sx={{ ...searchButton, mr: "5px" }}
              >
                <IconButton sx={{ p: 0, color: "#fff" }}>
                  <SearchIcon />
                </IconButton>
              </Button>
            </Tooltip>
            <Tooltip title="Clear" arrow>
              <Button
                variant="contained"
                type="button"
                onClick={() => {
                  reset();
                  fetchUsers();
                }}
                sx={{ ...searchButton }}
              >
                <IconButton sx={{ p: 0, color: "#fff" }}>
                  <ClearIcon />
                </IconButton>
              </Button>
            </Tooltip>
          </form>
        </Box>
        <DataTable
          data={users}
          columns={tableHeaders}
          page={page}
          rowsPerPage={rowsPerPage}
          count={users.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          renderActions={renderActions}
        />
        <DeleteDialog
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          handleDelete={handleDeleteDialog}
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </>
  );
}
