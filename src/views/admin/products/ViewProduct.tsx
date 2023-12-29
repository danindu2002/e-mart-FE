import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../../App";
import axios from "../../../api/apiConfig";
import ActionButton from "../../../components/buttons/ActionButton";
import CloseIcon from "@mui/icons-material/Close";
import ImageSlider from "../../../components/cards/ImageSlider";
import DeleteDialog from "../../../components/dialogs/DeleteDialog";
import DataTable from "../../../components/tables/DataTable";

export default function ProductDetails() {
  const [product, setProduct] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const [productImages, setProductImages] = useState<any[]>([]);
  const { productId } = useParams();
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { setCartProducts, userId } = useContext(Context);
  let navigate = useNavigate();

  const storedUserData = sessionStorage.getItem("loggedUserData");
  const parsedUserData = JSON.parse(storedUserData as string);

  const handleChangePage = (product: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (product: any) => {
    setRowsPerPage(+product.target.value);
    setPage(0);
  };

  const fetchDocumentDetails = async () => {
    try {
      const response = await axios.get(
        `/documents/all-documents?productId=${productId}`
      );
      console.log("documents:", response.data.responseList);
      setDocuments(response.data.responseList);
    } catch (error) {
      console.log(error);
    }
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

  const handleDeleteClick = (document: any) => {
    console.log(document);
    setSelectedDocument(document);
    setOpenDelete(true);
  };

  const handleDeleteDialog = () => {
    deleteDocument(selectedDocument?.documentId);
    setOpenDelete(false);
  };

  const deleteDocument = async (documentId: any) => {
    try {
      const response = await axios.delete(
        `/documents/${userId}?documentId=${documentId}`
      );
      console.log(response);
      toast.success(response.data.description);
      fetchDocumentDetails();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.description);
    }
  };

  const handleViewDocument = async (document: any) => {
    try {
      const response = await axios.get(
        `/documents/?documentId=${document.documentId}`
      );
      console.log(response.data.object);
      let documentBase64 = response.data.object.document;
      console.log("Base64 PDF:", documentBase64);
      // Create a Blob from the base64 data
      const blob = base64toBlob(documentBase64);
      // Create a data URL from the Blob
      const dataUrl = URL.createObjectURL(blob);
      // Open a new window with the data URL
      window.open(dataUrl, "_blank");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.description);
    }
  };

  // Function to convert base64 to Blob
  const base64toBlob = (base64Data: string) => {
    const byteCharacters = atob(base64Data);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([byteArray], { type: "application/pdf" });
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
    fetchDocumentDetails();
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

  const renderActions = (document: any) => (
    <Box>
      <ActionButton
        title="View Document"
        onClick={() => handleViewDocument(document)}
        icon={<VisibilityIcon />}
      />
    </Box>
  );

  const tableHeaders = [
    "#",
    "Document Name",
    "Document Type",
    "Product Name",
    "Product Code",
  ];

  return (
    <Box sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
      <Container maxWidth="lg" sx={{ mt: 2, ml: -2 }}>
        <Grid container spacing={2}>
          <ImageSlider images={imageArray} />
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "70vh",
                boxShadow: "none",
                borderRadius: "10px",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto", alignItems: "flex-start" }}>
                <Typography
                  component="div"
                  // variant="h6"
                  sx={{
                    fontSize: "12.5px",
                    letterSpacing: "1px",
                    color: "#ffb300",
                  }}
                >
                  <b>{product?.category}</b>
                </Typography>
                <Typography
                  component="div"
                  variant="h4"
                  sx={{ fontSize: "35px" }}
                >
                  <b>{product?.productName}</b>
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
                  sx={{ textAlign: "justify", fontSize: "15px", mt: 2, mb: 1 }}
                >
                  {product?.description}
                </Typography>

                {product?.size !== "" && (
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    Size: {product?.size}
                  </Typography>
                )}
                {product?.color !== "" && (
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontSize: "18px" }}
                  >
                    Color : {product?.color}
                  </Typography>
                )}
                <Box display="flex" alignItems="center">
                  <Typography
                    component="div"
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      alignItems: "center",
                      mt: 1,
                      mb: 1.5,
                    }}
                  >
                    Quantity : {product?.quantity}
                    {/* {product?.quantity !== 0 ? (
                      <Chip
                        icon={<CheckIcon sx={{ fontSize: "15px" }} />}
                        label="In Stock"
                        color="warning"
                        sx={{ ml: 1.5, fontSize: "12px" }}
                      />
                    ) : (
                      <Chip
                        icon={<CloseIcon sx={{ fontSize: "15px" }} />}
                        label="Out of Stock"
                        color="error"
                        sx={{ ml: 1.5, fontSize: "12px" }}
                      />
                    )} */}
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", fontSize: "26px", mb: 1.5 }}
                >
                  Rs. {product?.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ ml: 7 }}>
          <Typography
            component="div"
            variant="h6"
            sx={{ fontWeight: "bold", mt: 3 }}
          >
            Document Details
          </Typography>
          <DataTable
            data={documents}
            columns={tableHeaders}
            page={page}
            rowsPerPage={rowsPerPage}
            count={documents.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            renderActions={renderActions}
            noDataMessage="No Documents Available"
          />
        </Box>
      </Container>
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
    </Box>
  );
}
