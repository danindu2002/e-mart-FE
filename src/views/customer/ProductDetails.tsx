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
import axios from "../../api/apiConfig";
import ProductImage from "../../assets/images/headphones.jpg";
import ProductImage2 from "../../assets/images/headphone2.jpg";
import TopBar from "./TopBar";
import ImageSlider from "../../components/cards/ImageSlider";
import { toast } from "react-toastify";
import { Context } from "../../App";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function ProductDetails() {
  const [product, setProduct] = useState<any>(null);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const [productImages, setProductImages] = useState<any[]>([]);
  const { productId } = useParams();
  const [count, setCount] = useState<number>(1);
  const { setCartProducts } = useContext(Context);
  let navigate = useNavigate();

  const storedUserData = sessionStorage.getItem("loggedUserData");
  const parsedUserData = JSON.parse(storedUserData as string);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => Math.max(1, prevCount - 1));
  };

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

  const fetchProductImages = async () => {
    try {
      setOpenDrop(true);
      const response = await axios.get(
        `/images/all-images?productId=${productId}`
      );
      console.log("product images:", response.data.responseList);

      const decodedImages = response.data.responseList.map(
        (imageObject: any) => {
          const { imageName, image } = imageObject;
          const decodedImage = decodeBase64Image(image);
          return { imageName, decodedImage };
        }
      );
      setProductImages(decodedImages);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDrop(false);
    }
  };

  const decodeBase64Image = (base64String: string) => {
    try {
      const byteCharacters = atob(base64String);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }
      return URL.createObjectURL(new Blob([byteArray]));
    } catch (error) {
      console.error("Error decoding base64 image:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchProductImages();
  }, [productId]);

  useEffect(() => {
    console.log("Decoded Images", productImages);
  }, [productImages]);

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

  const imageArray = productImages.map(
    (imageObject) => imageObject.decodedImage
  );
  console.log("imageArray", imageArray);

  return (
    <Box sx={{ backgroundColor: "#fff " }}>
      {productImages.length > 0 && (
        <img
          src="blob:http://localhost:3000/25a5402a-1f24-4691-8070-0957b495f972"
          alt="test"
        />
      )}
      <Container maxWidth="lg" sx={{ mt: 13 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              type="button"
              sx={{
                marginLeft: 14,
                p: 0,
              }}
              onClick={() => navigate(-1)}
              startIcon={<KeyboardArrowLeftIcon />}
            >
              Go Back
            </Button>
          </Grid>
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
                <Box display="flex" alignItems="center">
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={decrement}
                    sx={{ p: "4px", minWidth: "30px", color: "#fff" }}
                  >
                    -
                  </Button>
                  <Typography variant="h6" component="span" sx={{ mx: 1 }}>
                    {count}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    color="info"
                    onClick={increment}
                    sx={{ p: "4px", minWidth: "30px", color: "#fff" }}
                  >
                    +
                  </Button>
                </Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Rs. {product?.price.toFixed(2)}
                </Typography>
                <Button
                  type="button"
                  variant="contained"
                  color="success"
                  sx={{
                    alignSelf: "center",
                    color: "#fff",
                    mt: 2,
                  }}
                  startIcon={<ShoppingCartIcon />}
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
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
