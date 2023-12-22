import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import axios from "../../api/apiConfig";
import HomepageImage from "../../assets/images/HomepageImage.jpg";
import ProductCard from "../../components/cards/ProductCard";
import Chip from "@mui/material/Chip";

export default function Homepage() {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory } =
    useContext(Context);

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
    console.log(selectedCategory);
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

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchProducts();
    } else {
      searchProducts(searchTerm);
    }
  }, [searchTerm]);

  const clearFilters = () => {
    setSelectedCategory(null);
    fetchProducts();
  };

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
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            variant="h5"
            color="initial"
            sx={{ fontWeight: "bold", mb: 3, mr: 2 }}
          >
            Products For You!
          </Typography>
          {selectedCategory && (
            <Chip
              label="Clear Filters"
              variant="outlined"
              onDelete={clearFilters}
            />
          )}
        </Box>
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
