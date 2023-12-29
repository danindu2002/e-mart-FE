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
  Rating,
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
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const { userId } = useContext(Context);
  const navigate = useNavigate();

  const fetchProducts = () => {
    setOpenDrop(true);
    axios
      .get("/products/view-products")
      .then((response) => {
        console.log(response.data.responseList);
        setProducts(formatData(response.data.responseList));
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenDrop(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatData = (data: Array<any>) => {
    console.log("Products: ", data);
    return data?.map((data: any) => ({
      productId: data?.productId,
      productName: data?.productName,
      quantity: data?.quantity,
      price: data?.price.toFixed(2),
      rating: (
        <Rating
          name="rating"
          value={data?.rating / 2}
          precision={0.5}
          readOnly
        />
      ),
      category: data?.category,
    }));
  };

  const handleChangePage = (product: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (product: any) => {
    setRowsPerPage(+product.target.value);
    setPage(0);
  };

  const { register, handleSubmit, reset } = useForm();

  const submitHandler = (data: any) => {
    console.log(data);
    fetchSearchedProduct(data);
  };

  const fetchSearchedProduct = (data: any) => {
    setOpenDrop(true);
    axios
      .get(`/products/search-products/${data.name}`)
      .then((response) => setProducts(formatData(response.data.responseList)))
      .catch((error) => setProducts(formatData([])));
    setOpenDrop(false);
  };

  const handleDeleteClick = (product: any) => {
    console.log(product);
    setSelectedProduct(product);
    setOpenDelete(true);
  };

  const handleDeleteDialog = () => {
    deleteAdmin(selectedProduct?.productId);
    setOpenDelete(false);
  };

  const deleteAdmin = async (productId: any) => {
    try {
      const response = await axios.delete(`/products/${productId}/${userId}`);
      console.log(response);
      toast.success(response.data.description);
      fetchProducts();
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
    "Product Name",
    "Quantity",
    "Price",
    "Rating",
    "Category",
  ];

  const renderActions = (product: any) => (
    <Box sx={{ ...actionButtonBox }}>
      <ActionButton
        title="View Details"
        to={`view-product/${product?.productId}`}
        icon={<VisibilityIcon />}
      />
      <ActionButton
        title="Edit Details"
        to={`update-product/${product?.productId}`}
        icon={<EditIcon />}
      />
      <ActionButton
        title="Delete Product"
        onClick={() => handleDeleteClick(product)}
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
        onClick={() => navigate("/admin/products/add-product")}
        startIcon={<AddIcon />}
      >
        Add Product
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
            Manage Products
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mb: "10px" }}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <FormTextField
              placeholder="Search by product name or description"
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
                  fetchProducts();
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
          data={products}
          columns={tableHeaders}
          page={page}
          rowsPerPage={rowsPerPage}
          count={products.length}
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
