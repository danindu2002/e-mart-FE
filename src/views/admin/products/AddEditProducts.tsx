import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography,
  styled,
} from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "../../../api/apiConfig";
import AddProductDetails from "./AddProductDetails";
import AddDocuments from "./AddDocuments";
import AddProductPhotos from "./AddProductPhotos";

const steps = ["Add Product Details", "Add Documents", "Add Product Photos"];

export default function AddEditProduct() {
  const [categories, setCategories] = useState<any[]>([]);
  const [addedProductId, setAddedProductId] = useState<any>(null);
  let editProduct = false;
  let navigate = useNavigate();
  const { productId } = useParams();
  editProduct = Boolean(productId);
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const schema = yup.object().shape({
    productName: yup.string().required("Product name is required"),
    productCode: yup
      .string()
      .trim()
      .required("Product code is required")
      .min(1, "Product code must be at least 1 character")
      .max(5, "Product code must be at most 5 characters"),
    description: yup.string().required("Description is required"),
    quantity: yup
      .number()
      .typeError("Please enter a valid input")
      .positive("Quantity must be a positive number")
      .integer("Quantity must be an integer")
      .required("Quantity is required"),
    rating: yup
      .number()
      .typeError("Please enter a valid input")
      .integer("Rating must be an integer")
      .min(1, "Rating must be at least 1")
      .max(10, "Rating must be at most 10")
      .required("Rating is required"),

    price: yup
      .number()
      .typeError("Please enter a valid input")
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

  useLayoutEffect(() => {
    if (editProduct) {
      axios
        .get(`/products/view-products/${productId}`)
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

    return () => {
      reset();
    };
  }, [editProduct, productId, reset, setValue]);

  const handleNext = async () => {
    if (activeStep === 1) {
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const uploadDocument = await readFileAsBase64(file);
          let data = {
            documentName: file?.name,
            documentDescription: file?.type,
            document: uploadDocument,
            productId: addedProductId,
          };
          console.log(data);
          axios
            .post("/documents/", data)
            .then((response) => {
              console.log(response);
              toast.success(response.data.description);
            })
            .catch((error) => {
              console.log(error);
              toast.error(error.response.data.description);
            });
        }
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 2) {
      console.log(selectedImages);
      if (selectedImages.length > 0) {
        for (const file of selectedImages) {
          const uploadImage = await readFileAsBase64(file);
          let data = {
            imageName: file?.name.replace(/\.pdf$/, ""),
            image: uploadImage,
            productId: addedProductId,
          };
          console.log("image data", data);
          axios
            .post("/images/", data)
            .then((response) => {
              console.log(response);
              toast.success(response.data.description);
            })
            .catch((error) => {
              console.log(error);
              toast.error(error.response.data.description);
            });
        }
        setSelectedFiles([]);
        setSelectedImages([]);
        navigate("/admin/products");
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
    } else {
      console.log("No files uploaded");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      setSelectedImages(Array.from(files));
    } else {
      console.log("No files uploaded");
    }
  };

  const submitHandler = (data: any) => {
    if (data.password) {
      // Encode the 'password' using Base64
      data.password = btoa(data.password);
    }
    console.log("Submit Data", data);

    if (editProduct) {
      // Update Product
      console.log(data);
      axios
        .put(`/products/${productId}`, data)
        .then((response) => {
          console.log(response);
          toast.success(response.data.description);
          setAddedProductId(response.data?.object?.productId);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.description);
        });
    } else {
      // Add Product
      console.log(data);
      axios
        .post("/products/", data)
        .then((response) => {
          console.log(response);
          toast.success(response.data.description);
          setAddedProductId(response.data?.object?.productId);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.description);
        });
    }
    setIsSubmitted(true);
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
            selectedFiles={selectedFiles}
          />
        );
      case 2:
        return <AddProductPhotos handleFileChange={handleImageChange} />;
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
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Box sx={{ mt: 3 }}>
            <>{getStepContent(activeStep)}</>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === 0 && (
                <Button
                  type="submit"
                  color="secondary"
                  onClick={handleSubmit(submitHandler)}
                >
                  Submit
                </Button>
              )}
              {activeStep === 0 && (
                <Button color="secondary" onClick={() => reset()}>
                  Clear
                </Button>
              )}
              <Button onClick={handleNext} disabled={!isSubmitted}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
