import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/apiConfig";
import ProductImage from "../../../assets/images/headphones.jpg";
import ProductImage2 from "../../../assets/images/headphone2.jpg";
import TopBar from "../../customer/TopBar";
import ImageSlider from "../../../components/cards/ImageSlider";
import { toast } from "react-toastify";
import { Context } from "../../../App";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const imageArray = [ProductImage, ProductImage2];

export default function ProductDetails() {
  const [product, setProduct] = useState<any>(null);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const { productId } = useParams();
  const [count, setCount] = useState<number>(1);
  const { setCartProducts } = useContext(Context);
  let navigate = useNavigate();

  const storedUserData = sessionStorage.getItem("loggedUserData");
  const parsedUserData = JSON.parse(storedUserData as string);

  const fetchProduct = async () => {
    try {
      setOpenDrop(true);
      const response = await axios.get(`/products/view-products/${productId}`);
      console.log("product:", response.data.object);
      setProduct(response.data.object);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDrop(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const addToCartHandler = async () => {
    console.log("productId", productId);
    console.log("count", count);
    console.log("storedUserData", storedUserData);

    try {
      const response = await axios.post(
        `/cart/products?userId=${parsedUserData?.userId}&productId=${productId}&noOfItems=${count}`
      );
      toast.success(response.data.description);
      console.log(response.data.responseList);
      fetchCartItems();
    } catch (error: any) {
      toast.error(error.response.data.description);
      console.error(error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/cart/${parsedUserData?.userId}`);
      setCartProducts(response.data.object?.productsList.length);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fff", pb: 2 }}>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <ImageSlider images={imageArray} />
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "70vh",
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto", alignItems: "flex-start" }}>
                <Typography component="div" variant="h5">
                  {product?.productName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <Rating
                    name="rating"
                    value={product?.rating / 2}
                    precision={0.5}
                    readOnly
                  />
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {product?.description}
                </Typography>
                {product?.size !== "" && (
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontSize: "20px" }}
                  >
                    Size: {product?.size}
                  </Typography>
                )}
                {product?.color !== "" && (
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontSize: "20px" }}
                  >
                    Color: {product?.color}
                  </Typography>
                )}
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Rs. {product?.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
