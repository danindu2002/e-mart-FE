import React, { useContext, useEffect, useState } from "react";
import TopBar from "./TopBar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "../../api/apiConfig";
import DataTable from "../../components/tables/DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import ActionButton from "../../components/buttons/ActionButton";
import Swal from "sweetalert2";
import { Context } from "../../App";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const { cartProducts, setCartProducts } = useContext(Context);
  let navigate = useNavigate();

  const storedUserData = sessionStorage.getItem("loggedUserData");
  const parsedUserData = JSON.parse(storedUserData as string);

  const fetchCartItems = async () => {
    setOpenDrop(true);
    try {
      const response = await axios.get(`/cart/${parsedUserData?.userId}`);
      setCartItems(formatData(response.data.object?.productsList));
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDrop(false);
    }
  };

  useEffect(() => {
    setCartProducts(cartItems.length);
  }, [cartItems]);

  const formatData = (data: Array<any>) => {
    console.log("Products in Cart: ", data);
    // setCartProducts(data?.length || 0);
    // Return the formatted data
    return data?.map((data: any) => ({
      productId: data?.productId,
      productName: data?.productName,
      quantity: data?.noOfItems,
      color: data?.color,
      size: data?.size,
      subTotal: data?.subTotal.toFixed(2),
    }));
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleChangePage = (product: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (product: any) => {
    setRowsPerPage(+product.target.value);
    setPage(0);
  };

  const calculateSubtotal = () => {
    return (
      cartItems?.reduce(
        (total: any, item: any) => total + Number(item.subTotal),
        0
      ) || 0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString();
  };

  const handleCheckout = async () => {
    const data = {
      checkoutDate: getCurrentDate(),
      total: calculateTotal(),
      ordered: true,
    };
    const newCartData = {
      checkoutDate: getCurrentDate(),
      total: 0,
    };
    console.log(data);
    try {
      if (calculateTotal() == 0) {
        await Swal.fire({
          title: "Your cart is empty",
          text: "Continue shopping and add items to your cart",
          icon: "info",
          iconColor: "#ffa000",
          confirmButtonText: "Let's go",
          confirmButtonColor: "#ffa000",
          allowOutsideClick: false,
        });
        navigate("/user");
        return;
      }
      const response = await axios.put(`/cart/${parsedUserData.userId}`, data);
      console.log(response.data);
      Swal.fire({
        title: "Payment Successful!",
        icon: "success",
        iconColor: "#ffa000",
        confirmButtonColor: "#ffa000",
      });
      setCartItems([]);

      // creating a new cart after checking out
      await axios.post(`/cart/${parsedUserData.userId}`, newCartData);
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        title: "Oops...",
        text: error.response.data.description,
        icon: "error",
        iconColor: "#ffa000",
        confirmButtonColor: "#ffa000",
      });
    }
  };

  async function handleDeleteClick(product: any) {
    try {
      const response = await axios.delete(
        `/cart/products?userId=${parsedUserData.userId}&productId=${product.productId}`
      );
      console.log(response.data);
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  }

  const tableHeaders = [
    "#",
    "Product Name",
    "Quantity",
    "Color",
    "Size",
    "Subtotal",
  ];

  const renderActions = (product: any) => (
    <Box>
      <ActionButton
        title="Delete Item"
        onClick={() => handleDeleteClick(product)}
        icon={<DeleteIcon />}
      />
    </Box>
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Button
          type="button"
          sx={{
            p: 0,
            mb: 2,
          }}
          onClick={() => navigate(-1)}
          startIcon={<KeyboardArrowLeftIcon />}
        >
          Go Back
        </Button>
        <Typography variant="h5" color="initial" sx={{ fontWeight: "bold" }}>
          Shopping Cart Details
        </Typography>
        <Grid container spacing={2} marginTop="10px">
          <Grid item xs={12} md={7.5} sx={{ mr: 6 }}>
            <DataTable
              data={cartItems}
              columns={tableHeaders}
              page={page}
              rowsPerPage={rowsPerPage}
              count={cartItems?.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              renderActions={renderActions}
              noDataMessage="No Items in the Cart"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6))",
              p: "0px 15px 15px 0px",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ m: 2, minHeight: "45vh" }}>
              <Typography
                variant="h6"
                paddingBottom="10px"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#ffb300",
                }}
              >
                <span>Summary</span>
              </Typography>
              <Divider sx={{ backgroundColor: "white", my: 1 }} />
              <Typography
                variant="body2"
                paddingTop="10px"
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <span>Subtotal</span>
                <span>Rs. {calculateSubtotal().toFixed(2)}</span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <span>Discount</span>
                <span>Rs. 0.00</span>
              </Typography>
              <Typography
                variant="body2"
                pb="10px"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Shipping Fee</span>
                <span>Rs. 0.00</span>
              </Typography>
              <Divider sx={{ backgroundColor: "white", my: 1 }} />
              <Typography
                variant="body1"
                paddingTop="10px"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Total</span>
                <span>Rs. {calculateTotal().toFixed(2)}</span>
              </Typography>
              <Button
                type="button"
                // disabled={calculateTotal() == 0 ? true : false}
                variant="contained"
                color="success"
                fullWidth
                sx={{
                  alignSelf: "center",
                  color: "#fff",
                  mt: 2,
                  fontSize: "13px",
                }}
                endIcon={<ArrowForwardIosIcon />}
                onClick={handleCheckout}
              >
                Proceed to checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
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
