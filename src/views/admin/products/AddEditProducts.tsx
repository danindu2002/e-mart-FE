import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "../../../api/apiConfig";
import AddDocuments from "./AddDocuments";
import AddProductDetails from "./AddProductDetails";
import AddProductPhotos from "./AddProductPhotos";
import { Context } from "../../../App";

const steps = ["Add Product Details", "Add Documents", "Add Product Photos"];

export default function AddEditProduct() {
  const [categories, setCategories] = useState<any[]>([]);
  const [addedProductId, setAddedProductId] = useState<any>(null);
  let editProduct: any = false;
  let navigate = useNavigate();
  let { productId }: any = useParams();
  editProduct = Boolean(productId);
  const [activeStep, setActiveStep] = useState(0);
  const [documents, setDocuments] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const isScreenSm = useMediaQuery("(max-width:900px)");
  const { userId } = useContext(Context);

  const schema = yup.object().shape({
    productName: yup
      .string()
      .required("Product name is required")
      .matches(/\S/, "Product Name cannot be empty"),
    productCode: yup
      .string()
      .trim()
      .required("Product code is required")
      .min(1, "Product code must be between 1 and 5 characters")
      .max(5, "Product code must be between 1 and 5 characters")
      .matches(/\S/, "Product code cannot be empty"),
    description: yup
      .string()
      .required("Description is required")
      .max(300, "Description must be less than 300 characters")
      .matches(/\S/, "Description cannot be empty"),
    quantity: yup
      .number()
      .typeError("Please enter a valid quantity")
      .min(0, "Quantity cannot be a negative number")
      .integer("Quantity must be a whole number")
      .required("Quantity is required"),
    rating: yup
      .number()
      .typeError("Please enter a valid rating")
      .integer("Rating must be a whole number")
      .min(1, "Rating must be between 1 and 10")
      .max(10, "Rating must be between 1 and 10")
      .required("Rating is required"),
    price: yup
      .number()
      .typeError("Please enter a valid price")
      .positive("Price must be a positive number")
      .required("Price is required"),
    size: yup.string(),
    color: yup.string(),
    category: yup.string().required("Category is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchCategories = () => {
    axios
      .get("/categories/")
      .then((response) => {
        console.log(response.data.responseList);
        setCategories(response.data.responseList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (editProduct) {
      axios
        .get(`/products/view-products-category/${productId}`)
        .then((res) => {
          console.log("user:", res.data);
          setValue("productName", res.data.object.productName);
          setValue("productCode", res.data.object.productCode);
          setValue("description", res.data.object.description);
          setValue("quantity", res.data.object.quantity);
          setValue("rating", res.data.object.rating);
          setValue("price", res.data.object.price);
          setValue("size", res.data.object.size);
          setValue("color", res.data.object.color);
          setValue("category", res.data.object.category);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchCategories();
  }, [editProduct, productId, reset]);

  const handleNext = (data: any) => {
    if (activeStep === 0) {
      submitHandler(data);
    } else if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 2) {
      navigate("/admin/products");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleDocumentChange = async (event: any) => {
    let files = event.target.files;
    if (files && files.length > 0) {
      setOpenDrop(true);
      for (const file of files) {
        // Check file size before proceeding
        if (file.size > 1000000) {
          toast.error("File size exceeds the limit of 1MB");
          continue;
        }
        const uploadDocument = await readFileAsBase64(file);
        let data = {
          documentName: file?.name.replace(/\.pdf$/, ""),
          documentDescription: file?.type,
          document: uploadDocument,
          productId: addedProductId,
        };
        console.log(data);
        axios
          .post(`/documents/${userId}`, data)
          .then((response) => {
            console.log(response);
            toast.success(response.data.description);
            fetchDocumentDetails();
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.description ?? "An error occurred");
          });
      }

      setOpenDrop(false);
      event.target.value = null;
    } else {
      console.log("No files uploaded");
    }
  };

  const handleImageChange = async (event: any) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setOpenDrop(true);
      for (const file of files) {
        // Check file size before proceeding
        if (file.size > 1000000) {
          toast.error("File size exceeds the limit of 1MB");
          continue;
        }
        const uploadImage = await readFileAsBase64(file);
        let data = {
          imageName: file?.name,
          image: uploadImage,
          productId: addedProductId,
        };
        console.log("image data", data);
        axios
          .post(`/images/${userId}`, data)
          .then((response) => {
            console.log(response);
            toast.success(response.data.description);
            fetchImageDetails();
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.description ?? "An error occurred");
          });
      }
      setOpenDrop(false);
      event.target.value = null;
    } else {
      console.log("No files uploaded");
    }
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event?.target?.result) {
          resolve((event.target.result as string).split(",")[1]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleBack = () => {
    if (activeStep == 1) {
      navigate(`/admin/products/update-product/${addedProductId}`);
      console.log("addedProductId", addedProductId);
    }
    setActiveStep((prevStep) => prevStep - 1);
  };

  const submitHandler = (data: any) => {
    console.log("Submit Data", data);

    if (editProduct) {
      // Update Product
      setAddedProductId(productId);
      console.log(data);
      axios
        .put(`/products/${productId}/${userId}`, data)
        .then((response) => {
          console.log(response);
          toast.success(response.data.description);
          setAddedProductId(response.data?.object?.productId);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.description ?? "An error occurred");
        });
    } else {
      // Add Product
      console.log(data);
      axios
        .post(`/products/${userId}`, data)
        .then((response) => {
          console.log(response);
          toast.success(response.data.description);
          setAddedProductId(response.data?.object?.productId);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.description ?? "An error occurred");
        });
    }
  };

  const fetchDocumentDetails = async () => {
    try {
      const response = await axios.get(
        productId === undefined
          ? `/documents/all-documents?productId=${addedProductId}`
          : `/documents/all-documents?productId=${productId}`
      );
      console.log("documents:", response.data.responseList);
      let responseData = response.data.responseList;
      setDocuments(responseData);
    } catch (error: any) {
      let responseData = error.response.data.responseList;
      if (responseData && responseData.length === 0) {
        setDocuments([]);
        console.error(error);
      }
      console.error(error);
    }
  };

  const fetchImageDetails = async () => {
    try {
      const response = await axios.get(
        productId === undefined
          ? `/images/all-images?productId=${addedProductId}`
          : `/images/all-images?productId=${productId}`
      );
      console.log("images:", response.data.responseList);
      let responseData = response.data.responseList;
      setImages(responseData);
    } catch (error: any) {
      let responseData = error.response.data.responseList;
      if (responseData && responseData.length === 0) {
        setImages([]);
        console.error(error);
      }
      console.error(error);
    }
  };

  const backgroundStyles = {
    display: "flex",
    p: 2,
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255)",
    borderRadius: "8px",
    width: { lg: "82vw" },
  };

  const getStepContent = (stepIndex: any) => {
    switch (stepIndex) {
      case 0:
        return (
          <AddProductDetails
            register={register}
            errors={errors}
            control={control}
            categories={categories}
            handleSubmit={handleSubmit(submitHandler)}
          />
        );
      case 1:
        return (
          <AddDocuments
            handleFileChange={handleDocumentChange}
            productId={addedProductId}
            documents={documents}
            fetchDocumentDetails={fetchDocumentDetails}
          />
        );
      case 2:
        return (
          <AddProductPhotos
            handleFileChange={handleImageChange}
            productId={addedProductId}
            images={images}
            fetchImageDetails={fetchImageDetails}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box
      maxWidth="md"
      className="form"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="lg" sx={{ ...backgroundStyles }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1.5, color: "#444" }}
        >
          {editProduct ? "Edit Product" : "Add Product"}
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>
                    {isScreenSm && index !== activeStep ? null : label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Box sx={{ mt: 3 }}>
            <>{getStepContent(activeStep)}</>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {activeStep !== 0 && (
                <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === 0 && (
                <Button color="secondary" onClick={() => reset()}>
                  Clear
                </Button>
              )}
              <Button onClick={handleSubmit(handleNext)}>
                {activeStep === steps.length - 1
                  ? "Finish"
                  : activeStep === 0
                  ? "Save and Next"
                  : "Next"}
              </Button>
            </Box>
          </Box>
        </Box>
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
