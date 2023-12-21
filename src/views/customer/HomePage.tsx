import { Box, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import axios from "../../api/apiConfig";
import HomepageImage from "../../assets/images/HomepageImage.jpg";
import ProductCard from "../../components/cards/ProductCard";

export default function Homepage() {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const {
    cartProducts,
    setCartProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useContext(Context);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products/view-products");
      setProducts(response.data.responseList);
    } catch (error) {
      console.log(error);
    }
  };

  const searchProducts = async (keyword: any) => {
    try {
      const response = await axios.get(
        `/products/search-products/${searchTerm}`
      );
      setProducts(response.data.responseList);
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  const searchCategories = async () => {
    try {
      const response = await axios.get(
        `/products/search-category/${selectedCategory}`
      );
      console.log(response.data.responseList);
      setProducts(response.data.responseList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchCategories();

    return () => {
      fetchProducts();
    };
  }, [selectedCategory]);

  // useEffect(() => {
  //   return () => {
  //     fetchProducts();
  //   };
  // }, [navigate]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchProducts();
    } else {
      searchProducts(searchTerm);
    }
  }, [searchTerm]);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Box sx={{ m: "20px auto" }}>
          <img
            src={HomepageImage}
            alt="Homepage Image"
            style={{ width: "100%" }}
          />
        </Box>
        <Typography
          variant="h5"
          color="initial"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Products For You!
        </Typography>
        {/* <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 1,
          }}
        > */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {products.map((product) => (
            <Grid item xs={12} sm={3}>
              <Link
                to={`/user/product-details/${product.productId}`}
                key={product.productId}
                style={{ textDecoration: "none" }}
              >
                <ProductCard
                  id={product.productId}
                  name={product.productName}
                  rating={product.rating}
                  description={product.description}
                  price={product.price}
                />
              </Link>
            </Grid>
          ))}
          {/* </Box> */}
        </Grid>
      </Container>
    </>
  );
}
