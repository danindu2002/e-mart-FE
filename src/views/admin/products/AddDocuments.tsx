import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Box, Button, Typography } from "@mui/material";
import axios from "../../../api/apiConfig";
import { useContext, useEffect, useState } from "react";
import ActionButton from "../../../components/buttons/ActionButton";
import { toast } from "react-toastify";
import DataTable from "../../../components/tables/DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../../../components/dialogs/DeleteDialog";
import { Context } from "../../../App";

const AddDocuments = ({
  handleFileChange,
  fetchDocumentDetails,
  documents,
}: any) => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { userId } = useContext(Context);

  useEffect(() => {
    fetchDocumentDetails();
  }, []);

  const handleChangePage = (product: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (product: any) => {
    setRowsPerPage(+product.target.value);
    setPage(0);
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
      toast.error(error.response.data.description ?? "An error occurred");
    }
  };

  const renderActions = (document: any) => (
    <Box>
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
        <Typography variant="h6">Upload Document</Typography>
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
          <Typography variant="body2" sx={{ mb: "10px" }}>
            Click to upload your Document (Max Size: 1MB, PDF format only)
          </Typography>
          <label htmlFor="file-input">
            <Button
              color="primary"
              variant="contained"
              component="label"
              startIcon={<NoteAddIcon />}
              sx={{ marginBottom: "15px" }}
            >
              Add Documents
              <input
                id="file-input"
                type="file"
                accept=".pdf"
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
                max-size="1000000" // 1MB in bytes
              />
            </Button>
          </label>
        </Box>
      </Box>
      {documents.length > 0 && (
        <>
          <Typography
            sx={{
              mt: 2,
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Uploaded Documents
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

export default AddDocuments;
