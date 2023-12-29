import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../api/apiConfig";
import SearchIcon from "@mui/icons-material/Search";
import ActionButton from "../../../components/buttons/ActionButton";
import AddCategoryDialog from "../../../components/dialogs/AddCategoryDialog";
import CategoryDialog from "../../../components/dialogs/UpdateCategoryDialog";
import DeleteDialog from "../../../components/dialogs/DeleteDialog";
import DataTable from "../../../components/tables/DataTable";
import UpdateCategoryDialog from "../../../components/dialogs/UpdateCategoryDialog";
import { ClearIcon } from "@mui/x-date-pickers";
import FormTextField from "../../../components/forms/FormTextField";
import { Context } from "../../../App";

export default function ManageCategory() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const navigate = useNavigate();
  const { userId } = useContext(Context);

  const { register, handleSubmit, reset } = useForm();

  const fetchCategories = () => {
    setOpenDrop(true);
    axios
      .get("/categories/")
      .then((response) => {
        console.log(response.data.responseList);
        setCategories(formatData(response.data.responseList));
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenDrop(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const formatData = (data: Array<any>) => {
    console.log("Categories: ", data);
    return data?.map((data: any) => ({
      categoryId: data?.refCategoryId,
      categoryCode: data?.categoryCode,
      categoryName: data?.refCategoryName,
      categoryDescription: data?.categoryDescription,
    }));
  };

  const handleChangePage = (category: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (category: any) => {
    setRowsPerPage(+category.target.value);
    setPage(0);
  };

  const submitHandler = (data: any) => {
    console.log(data);
    fetchSearchedProduct(data);
  };

  const fetchSearchedProduct = (data: any) => {
    setOpenDrop(true);
    axios
      .get(`/categories/search-categories/${data.name}`)
      .then((response) => setCategories(formatData(response.data.responseList)))
      .catch((error) => setCategories(formatData([])));
    setOpenDrop(false);
  };

  const addCategoryHandler = async (data: any) => {
    try {
      const response = await axios.post(`/categories/${userId}`, data);
      console.log(response.data);
      setOpen(false);
      fetchCategories();
      toast.success(response.data.description);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response.data.description ??
          "An error occurred while adding new category"
      );
    }
  };

  const handleUpdateClick = (category: any) => {
    console.log(category);
    setSelectedCategory(category);
    setOpenUpdate(true);
  };

  const categoryUpdateHandler = async (data: any) => {
    try {
      let categoryId = selectedCategory?.categoryId;
      console.log(categoryId);

      const response = await axios.put(
        `/categories/${userId}?categoryId=${categoryId}`,
        data
      );
      console.log(response.data);
      setOpenUpdate(false);
      fetchCategories();
      toast.success(response.data.description);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response.data.description ??
          "An error occurred while updating category"
      );
    }
  };

  const handleDeleteClick = (category: any) => {
    console.log(category);
    setSelectedCategory(category);
    setOpenDelete(true);
  };

  const handleDeleteDialog = () => {
    deleteCategory(selectedCategory?.categoryId);
    setOpenDelete(false);
  };

  const deleteCategory = async (categoryId: any) => {
    try {
      const response = await axios.delete(
        `/categories/${categoryId}/${userId}`
      );
      console.log(response);
      toast.success(response.data.description);
      fetchCategories();
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response.data.description ??
          "An error occurred while deleting category"
      );
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

  const tableHeaders = ["#", "Category Code", "Category Name", "Description"];

  const renderActions = (category: any) => (
    <Box sx={{ ...actionButtonBox }}>
      <ActionButton
        title="Edit Details"
        onClick={() => handleUpdateClick(category)}
        icon={<EditIcon />}
      />
      <ActionButton
        title="Delete Category"
        onClick={() => handleDeleteClick(category)}
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
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
      >
        Add Category
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
            Manage Categories
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mb: "10px" }}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <FormTextField
              placeholder="Search by category name or description"
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
                  fetchCategories();
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
          data={categories}
          columns={tableHeaders}
          page={page}
          rowsPerPage={rowsPerPage}
          count={categories.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          renderActions={renderActions}
        />
        <DeleteDialog
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          handleDelete={handleDeleteDialog}
        />
        <UpdateCategoryDialog
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          onSubmit={categoryUpdateHandler}
          category={selectedCategory}
        />
        <AddCategoryDialog
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={addCategoryHandler}
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
