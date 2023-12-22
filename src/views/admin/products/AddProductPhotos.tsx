import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import axios from "../../../api/apiConfig";
import ActionButton from "../../../components/buttons/ActionButton";
import { toast } from "react-toastify";
import DataTable from "../../../components/tables/DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../../../components/dialogs/DeleteDialog";

const AddProductPhotos = ({
  handleFileChange,
  fetchImageDetails,
  images,
}: any) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchImageDetails();
  }, []);

  const handleChangePage = (product: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (product: any) => {
    setRowsPerPage(+product.target.value);
    setPage(0);
  };

  const handleDeleteClick = (image: any) => {
    console.log(image);
    setSelectedImage(image);
    setOpenDelete(true);
  };

  const handleDeleteDialog = () => {
    deleteImage(selectedImage?.imageId);
    setOpenDelete(false);
  };

  const deleteImage = async (imageId: any) => {
    try {
      const response = await axios.delete(`/images/?imageId=${imageId}`);
      console.log(response);
      toast.success(response.data.description);
      fetchImageDetails();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.description);
    }
  };

  const formatData = (data: any) => {
    return data?.map((data: any) => ({
      imageId: data?.imageId,
      image: (
        <Avatar variant="square" src={`data:image/png;base64,${data?.image}`} />
      ),
      imageName: data?.imageName,
    }));
  };

  const renderActions = (image: any) => (
    <Box>
      <ActionButton
        title="Delete Image"
        onClick={() => handleDeleteClick(image)}
        icon={<DeleteIcon />}
      />
    </Box>
  );

  const tableHeaders = ["Image ID", "Image", "Image Name"];

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          mt: 2,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Upload Product Images
        </Typography>
        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label htmlFor="file-input">
            <Button
              color="primary"
              variant="contained"
              component="label"
              startIcon={<AddAPhotoIcon />}
              sx={{ marginBottom: "15px" }}
            >
              Add Product Images
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
              />
            </Button>
          </label>
          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            Click to upload your Product Images
          </Typography>
        </Box>
      </Box>
      {images.length > 0 && (
        <>
          <Typography
            sx={{
              mt: 2,
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Uploaded Product Images
          </Typography>
          <DataTable
            data={formatData(images)}
            columns={tableHeaders}
            page={page}
            rowsPerPage={rowsPerPage}
            count={images.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            renderActions={renderActions}
            noDataMessage="No Images Available"
          />
        </>
      )}
      <DeleteDialog
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        handleDelete={handleDeleteDialog}
      />
    </>
  );
};

export default AddProductPhotos;
