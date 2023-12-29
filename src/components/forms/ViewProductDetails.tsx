import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../App";
import axios from "../../api/apiConfig";
import ProductImage2 from "../../../assets/images/headphone2.jpg";
import ProductImage from "../../../assets/images/headphones.jpg";
import ActionButton from "../buttons/ActionButton";
import ImageSlider from "../cards/ImageSlider";
import DeleteDialog from "../dialogs/DeleteDialog";
import DataTable from "../tables/DataTable";

const imageArray = [ProductImage, ProductImage2];

export default function ProductDetails() {
  const [product, setProduct] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const { productId } = useParams();
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { userId } = useContext(Context);
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

  useEffect(() => {
    fetchProduct();
    fetchDocumentDetails();
  }, [productId]);

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
      toast.error(
        error.response.data.description ??
          "An error occurred while deleting document"
      );
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
      toast.error(error.response.data.description ?? "An error occurred");
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

  const renderActions = (document: any) => (
    <Box>
      <ActionButton
        title="View Document"
        onClick={() => handleViewDocument(document)}
        icon={<VisibilityIcon />}
      />
      <ActionButton
        title="Delete Document"
        onClick={() => handleDeleteClick(document)}
        icon={<DeleteIcon />}
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
        />
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
